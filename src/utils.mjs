import Cookies from 'js-cookie';
import StorageJS from '@timeone-group/storage-js';

import CONSTANTS from './constants.mjs';

export const Storage = new StorageJS({
  storageEngine: 'localStorage',
  prefix: CONSTANTS.default_storage_prefix,
  defaultTTL: CONSTANTS.consent.ttl,
});

// window.TOG_Storage = Storage;

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

export function setConversion() {}
