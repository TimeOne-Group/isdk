import Cookie from 'js-cookie';
import LZString from 'lz-string';
import { expect } from 'expect';

import * as utils from '../utils.mjs';
import CONSTANTS from '../constants.mjs';

const name = 'foo';
let currentTimestamp;
function formatAndCompress(value) {
  const formattedValue = JSON.stringify({ createAt: currentTimestamp, value });

  return LZString.compressToBase64(formattedValue);
}

function getConsentValueForStorage(value) {
  return JSON.stringify({ createAt: currentTimestamp, value });
}

describe('The utils function', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2022, 9, 1));

    currentTimestamp = utils.getCurrentTimestamp();
  });

  beforeEach(() => {
    utils.removeValue(name);
  });

  test('getPrefixedStorageName - Should return prefixed name', () => {
    expect(`${CONSTANTS.default_storage_prefix}_${name}_${CONSTANTS.current_storage_version}`).toEqual(
      utils.getPrefixedStorageName(name)
    );
  });

  test('getPrefixedStorageName - Should return prefixed v1 name', () => {
    expect(`${CONSTANTS.default_storage_prefix}_${name}`).toEqual(
      utils.getPrefixedStorageName(name, CONSTANTS.previous_storage_version)
    );
  });

  test('setValue - Should set cookie and localstorage when called', () => {
    const value = 'bar';
    const formattedValue = getConsentValueForStorage(value);

    expect(Cookie.get(name)).toBeFalsy();
    expect(Cookie.get(utils.getPrefixedStorageName(name))).toBeFalsy();
    expect(utils.Storage.find(utils.getPrefixedStorageName(name))).toBeFalsy();

    utils.setValue(value, name);

    expect(Cookie.get(name)).toBeFalsy();
    expect(Cookie.get(utils.getPrefixedStorageName(name))).toEqual(formattedValue);
    expect(utils.Storage.find(utils.getPrefixedStorageName(name))).toEqual(formattedValue);
  });

  [CONSTANTS.subid.name, CONSTANTS.cashback.name].forEach((configName) => {
    test(`setValue - Should compress value when store ${configName}`, () => {
      const value = JSON.stringify({ foo: 'bar' });
      const compressedValue = formatAndCompress(value);

      expect(Cookie.get(configName)).toBeFalsy();
      expect(Cookie.get(utils.getPrefixedStorageName(configName))).toBeFalsy();
      expect(utils.Storage.find(utils.getPrefixedStorageName(configName))).toBeFalsy();
      expect(utils.getValue(configName)).toBeFalsy();

      utils.setValue(value, configName);

      expect(Cookie.get(configName)).toBeFalsy();
      expect(Cookie.get(utils.getPrefixedStorageName(configName))).toEqual(compressedValue);
      expect(utils.Storage.find(utils.getPrefixedStorageName(configName))).toEqual(compressedValue);
      expect(utils.getValue(configName)).toEqual(value);
    });
  });

  test('getValue - Should return value from cookie first', () => {
    const cookieValue = 'cookie';
    const cookieStorageValue = JSON.stringify({ createAt: currentTimestamp, value: cookieValue });
    const localstorageValue = 'localstorage';
    const localstorageStorageValue = JSON.stringify({ createAt: currentTimestamp, value: localstorageValue });

    expect(Cookie.get(name)).toBeFalsy();
    expect(Cookie.get(utils.getPrefixedStorageName(name))).toBeFalsy();
    expect(utils.Storage.find(utils.getPrefixedStorageName(name))).toBeFalsy();

    expect(utils.getValue(name)).toBeFalsy();

    Cookie.set(utils.getPrefixedStorageName(name), cookieStorageValue);
    utils.Storage.save(utils.getPrefixedStorageName(name), localstorageStorageValue);

    expect(utils.getValue(name)).toEqual(cookieValue);
  });

  test('getValue - Should return value from localstorage when cookie not set', () => {
    const value = 'bar';
    const storageValue = JSON.stringify({ createAt: currentTimestamp, value });

    expect(Cookie.get(utils.getPrefixedStorageName(name))).toBeFalsy();
    expect(utils.Storage.find(utils.getPrefixedStorageName(name))).toBeFalsy();

    expect(utils.getValue(name)).toBeFalsy();

    utils.Storage.save({ id: utils.getPrefixedStorageName(name), value: storageValue });

    expect(utils.getValue(name)).toEqual(value);
  });

  test('getValue - Should return falsy when nothing set', () => {
    expect(utils.getValue(name)).toBeFalsy();
  });

  test('getValue - Should return value from cookie when localstorage is removed manually', () => {
    const value = 'bar';
    const storageValue = JSON.stringify({ createAt: currentTimestamp, value });

    utils.setValue(value, name);

    expect(Cookie.get(utils.getPrefixedStorageName(name))).toEqual(storageValue);
    expect(utils.Storage.find(utils.getPrefixedStorageName(name))).toEqual(storageValue);
    expect(utils.getValue(name)).toEqual(value);

    utils.Storage.delete(utils.getPrefixedStorageName(name));

    expect(utils.Storage.find(utils.getPrefixedStorageName(name))).toBeFalsy();
    expect(utils.getValue(name)).toEqual(value);
  });

  test('getValue - Should return value from localstorage when cookie is removed manually', () => {
    const value = 'bar';
    const storageValue = JSON.stringify({ createAt: currentTimestamp, value });

    utils.setValue(value, name);

    expect(Cookie.get(utils.getPrefixedStorageName(name))).toEqual(storageValue);
    expect(utils.Storage.find(utils.getPrefixedStorageName(name))).toEqual(storageValue);
    expect(utils.getValue(name)).toEqual(value);

    Cookie.remove(utils.getPrefixedStorageName(name));

    expect(Cookie.get(utils.getPrefixedStorageName(name))).toBeFalsy();
    expect(utils.getValue(name)).toEqual(value);
  });

  test('removeValue - Should remove a specific cookie and localstorage value when called', () => {
    const value = 'bar';
    const notRemoveValueName = 'do_not_remove_me';
    const notRemoveValueNameStorageValue = JSON.stringify({ createAt: currentTimestamp, value });

    utils.setValue(value, name);
    utils.setValue(value, notRemoveValueName);

    expect(utils.getValue(name)).toEqual(value);
    expect(utils.getValue(notRemoveValueName)).toEqual(value);

    utils.removeValue(name);

    expect(utils.getValue(name)).toBeFalsy();

    expect(utils.getValue(notRemoveValueName)).toEqual(value);
    expect(Cookie.get(utils.getPrefixedStorageName(notRemoveValueName))).toEqual(notRemoveValueNameStorageValue);
    expect(utils.Storage.find(utils.getPrefixedStorageName(notRemoveValueName))).toEqual(
      notRemoveValueNameStorageValue
    );
  });

  test('filterUnActiveSubids - Should remove expired subids base on TTL', () => {
    const ttlInDays = 5;
    const activeTimestamp = utils.getCurrentTimestamp() - utils.getTimestampFromTTL(ttlInDays - 1);
    const expiredTimestamp = utils.getCurrentTimestamp() - utils.getTimestampFromTTL(ttlInDays + 1);
    const activeSubid = 123;
    const expiredSubid = 456;

    const subids = { [activeSubid]: activeTimestamp, [expiredSubid]: expiredTimestamp };
    const activeSubids = { [activeSubid]: activeTimestamp };

    const filtredSubids = utils.filterUnActiveSubids(subids, ttlInDays);

    expect(Object.keys(subids)).toHaveLength(2);
    expect(Object.keys(filtredSubids)).toHaveLength(1);
    expect(filtredSubids).toEqual(activeSubids);
  });

  function randomString(length = 50) {
    return [...Array(length + 10)]
      .map(() => (Math.random() * 1000000).toString(36).replace('.', ''))
      .join('')
      .substring(0, length);
  }

  test('getMaxSubids - Should limit subids size and return the recent', () => {
    const ttlInDays = 10;
    const subidSize = CONSTANTS.cookie_max_size / ttlInDays;
    const olderSubidKey = '_lastone';
    const subidsEntries = [...Array(ttlInDays)].map((_, i) => [
      i !== 0 ? randomString(subidSize) : `${randomString(subidSize)}${olderSubidKey}`,
      utils.getCurrentTimestamp() - utils.getTimestampFromTTL(ttlInDays - i + 1),
    ]);

    const subids = Object.fromEntries(subidsEntries);

    expect(JSON.stringify(subids).length).toBeGreaterThanOrEqual(CONSTANTS.cookie_max_size);
    expect(subidsEntries.some((subid) => subid.indexOf(olderSubidKey))).toBeTruthy();

    const limitedSubids = utils.getMaxSubids(subids);

    expect(JSON.stringify(limitedSubids).length).toBeLessThanOrEqual(CONSTANTS.cookie_max_size);
    expect(Object.entries(limitedSubids).some((subid) => subid.indexOf(olderSubidKey))).toBeTruthy();
  });

  test('SubidCookieTypeError - Should throw custom error message', () => {
    const subidName = 'foo';

    expect(() => {
      throw new utils.SubidCookieTypeError(subidName);
    }).toThrow(`Cookie to_${subidName} or is a string. Expected object`);
  });

  describe('Retrocompatibility v1', () => {
    [CONSTANTS.consent.name, CONSTANTS.event_consent_id.name, CONSTANTS.subid.name, CONSTANTS.cashback.name].forEach(
      (configName) => {
        const sufixV1 = null;
        const currentStorageName = utils.getPrefixedStorageName(configName);
        const storageNameV1 = utils.getPrefixedStorageName(configName, sufixV1);
        beforeEach(() => {
          utils.removeValue(configName);
        });

        test(`getValue V1 - Should get ${configName} value from Cookie`, () => {
          const value = 'bar';

          Cookie.set(storageNameV1, value);

          expect(Cookie.get(currentStorageName)).toBeFalsy();
          expect(utils.Storage.find(currentStorageName)).toBeFalsy();

          expect(Cookie.get(storageNameV1)).toEqual(value);

          expect(utils.getValue(configName)).toBeFalsy();
          expect(utils.getValue(configName, sufixV1)).toEqual(value);
        });

        test(`removeValue V1 - Should get ${configName} value from Storage`, () => {
          const value = 'bar';

          utils.Storage.save({ id: storageNameV1, value });

          expect(Cookie.get(currentStorageName)).toBeFalsy();
          expect(utils.Storage.find(currentStorageName)).toBeFalsy();

          expect(utils.Storage.find(storageNameV1)).toEqual(value);

          expect(utils.getValue(configName)).toBeFalsy();
          expect(utils.getValue(configName, sufixV1)).toEqual(value);
        });
      }
    );
  });
});
