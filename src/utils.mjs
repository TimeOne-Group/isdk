import Cookies from 'js-cookie';
import LZString from 'lz-string';

import CONSTANTS from './constants.mjs';

export const Storage = {
  save: ({ id, value }) => {
    localStorage.setItem(id, value);
  },
  find: (id) => localStorage.getItem(id),

  delete: (id) => {
    localStorage.removeItem(id);
  },
};

export function getPrefixedStorageName(name, version = CONSTANTS.current_storage_version) {
  if (version) {
    return `${CONSTANTS.default_storage_prefix}_${name}_${version}`;
  }

  return `${CONSTANTS.default_storage_prefix}_${name}`;
}

export function isObject(obj) {
  return obj === Object(obj);
}

export function getCurrentTimestamp() {
  const currentDate = new Date();

  return currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000;
}

export function getTimestampFromTTL(ttl) {
  return (ttl || 0) * 1000 * 60 * 60 * 24;
}

function isExpired(createAt, ttl) {
  const currentTimestamp = getCurrentTimestamp();
  const duration = getTimestampFromTTL(ttl);

  return currentTimestamp - createAt > duration;
}

function setV2Value(value, options) {
  const storedValue = JSON.stringify({
    createAt: getCurrentTimestamp(),
    value,
  });

  return options?.compress ? LZString.compressToBase64(storedValue) : storedValue;
}

function getV2Value(storedValue, options) {
  if (!options?.compress) {
    const parseValue = JSON.parse(storedValue);

    return isExpired(parseValue?.createAt, options.ttl) ? null : parseValue?.value;
  }

  const uncompress = LZString.decompressFromBase64(storedValue);

  try {
    const parseValue = JSON.parse(uncompress);

    return isExpired(parseValue?.createAt, options.ttl) ? null : parseValue?.value;
  } catch (e) {
    return uncompress;
  }
}

const storedValue = {
  v2: {
    setValue: setV2Value,
    getValue: getV2Value,
  },
};

export function setValue(value, name) {
  const options = CONSTANTS[name] || {
    name,
    ttl: CONSTANTS.default_ttl,
  };

  const setStorageValue = storedValue?.[CONSTANTS.current_storage_version]?.setValue;
  const valueToStore = setStorageValue ? setStorageValue(value, options) : value;
  const storageName = getPrefixedStorageName(options.name);

  Cookies.set(storageName, valueToStore, {
    expires: options.ttl,
    sameSite: 'strict',
  });

  Storage.save({ id: storageName, value: valueToStore });
}

export function getValue(id, version = CONSTANTS.current_storage_version) {
  const options = CONSTANTS[id] || { name: id };
  const storageName = getPrefixedStorageName(options.name, version);

  const cookieValue = Cookies.get(storageName);
  const storage = Storage.find(storageName);
  const rawValue = cookieValue || storage || null;
  const getStorageValue = storedValue?.[version]?.getValue;

  return getStorageValue ? getStorageValue(rawValue, options) : rawValue;
}

export function removeValue(id, version = CONSTANTS.current_storage_version) {
  const name = CONSTANTS[id]?.name || id;

  Cookies.remove(getPrefixedStorageName(name, version));
  Storage.delete(getPrefixedStorageName(name, version));
}

export function* urlsIterator(urls = []) {
  let index = 0;

  while (index <= urls.length) {
    yield urls[index];
    index += 1;
  }
}

export function getApiIterator(urls) {
  const iterator = urlsIterator(urls);
  let currentUrl = iterator.next().value;

  return {
    next: () => {
      currentUrl = iterator.next().value;
    },
    get url() {
      return currentUrl;
    },
    urls,
  };
}

export function getCurrentUrl() {
  return `${window.location.hostname}${window.location.pathname}`;
}

export function filterUnActiveSubids(subids, ttl) {
  const currentTimestamp = getCurrentTimestamp();
  const duration = getTimestampFromTTL(ttl);

  return Object.fromEntries(Object.entries(subids).filter(([, createAt]) => currentTimestamp - createAt <= duration));
}

export function getMaxSubids(subids) {
  const subidsSize = LZString.compressToBase64(JSON.stringify(subids))?.length || 0;

  if (subidsSize > CONSTANTS.cookie_max_size) {
    const truncateSubids = Object.entries(subids)
      .sort(([, prevcreateAt], [, nextcreateAt]) => nextcreateAt - prevcreateAt)
      .slice(0, -1);

    return getMaxSubids(Object.fromEntries(truncateSubids));
  }

  return subids;
}

export class SubidCookieTypeError extends Error {
  constructor(subidName) {
    super(`Cookie to_${subidName} or is a string. Expected object`);
    this.code = CONSTANTS.errors.subidCookieType;
  }
}
