import Cookies from 'js-cookie';
import StorageJS from '@timeone-group/storage-js';
import LZString from 'lz-string';

import CONSTANTS from './constants.mjs';

export const Storage = new StorageJS({
  storageEngine: 'localStorage',
  prefix: CONSTANTS.default_storage_prefix,
  defaultTTL: CONSTANTS.consent.ttl,
});

export function getPrefixedCookieName(name) {
  return `${CONSTANTS.default_storage_prefix}_${name}`;
}

export function setValue(value, id) {
  const options = CONSTANTS[id] || {
    name: id,
    ttl: CONSTANTS.default_ttl,
  };

  const valueToStore = options?.compress ? LZString.compressToBase64(value) : value;

  Cookies.set(getPrefixedCookieName(options.name), valueToStore, {
    expires: options.ttl,
    sameSite: 'strict',
  });

  Storage.save({ id, value: valueToStore });
}

export function isObject(obj) {
  return obj === Object(obj);
}

export function getValue(id) {
  const options = CONSTANTS[id] || { name: id };
  const cookieValue = Cookies.get(getPrefixedCookieName(options.name));
  const storage = Storage.find(options.name);

  const rawValue = cookieValue || storage?.value || null;

  if (!options?.compress) {
    return rawValue;
  }

  try {
    const uncompress = LZString.decompressFromBase64(rawValue);

    if (options.type === 'Object') {
      const isValid = isObject(JSON.parse(uncompress));

      return isValid ? uncompress : rawValue;
    }

    return uncompress;
  } catch (error) {
    return rawValue;
  }
}

export function removeValue(id) {
  const name = CONSTANTS[id]?.name || id;

  Cookies.remove(getPrefixedCookieName(name));
  Storage.delete(name);
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

export function getCurrentTimestamp() {
  const currentDate = new Date();

  return currentDate.getTime() + currentDate.getTimezoneOffset() * 60 * 1000;
}

export function getTimestampFromTTL(ttl) {
  return (ttl || 0) * 1000 * 60 * 60 * 24;
}

export function filterUnActiveSubids(subids, ttl) {
  const currentTimestamp = getCurrentTimestamp();
  const duration = getTimestampFromTTL(ttl);

  return Object.fromEntries(Object.entries(subids).filter(([, createAt]) => currentTimestamp - createAt <= duration));
}

export function getMaxSubids(subids) {
  const subidsSize = LZString.compressToBase64(JSON.stringify(subids))?.length || 0;

  if (subidsSize > CONSTANTS.cookieMaxSize) {
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
