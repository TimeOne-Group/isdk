import Cookies from 'js-cookie';
import StorageJS from '@timeone-group/storage-js';

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
  const option = CONSTANTS[id] || {
    name: id,
    ttl: CONSTANTS.default_ttl,
  };

  Cookies.set(getPrefixedCookieName(option.name), value, {
    expires: option.ttl,
    sameSite: 'strict',
  });

  Storage.save({ id, value });
}

export function getValue(id) {
  const name = CONSTANTS[id]?.name || id;
  const cookieValue = Cookies.get(getPrefixedCookieName(name));

  if (cookieValue) {
    return cookieValue;
  }

  const storage = Storage.find(name);

  if (storage?.value) {
    return storage?.value;
  }

  return null;
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
