import Cookie from 'js-cookie';
import LZString from 'lz-string';
import { expect } from 'expect';

import * as utils from '../utils.mjs';
import CONSTANTS from '../constants.mjs';

const name = 'foo';

function compress(subids) {
  return LZString.compressToBase64(subids);
}

describe('The utils function', () => {
  beforeEach(() => {
    utils.removeValue(name);
  });

  test('getPrefixedCookieName - Should return prefixed name', () => {
    expect(`${CONSTANTS.default_storage_prefix}_${name}`).toEqual(utils.getPrefixedCookieName(name));
  });

  test('setValue - Should set cookie and localstorage when called', () => {
    const value = 'bar';

    expect(Cookie.get(name)).toBeFalsy();
    expect(Cookie.get(utils.getPrefixedCookieName(name))).toBeFalsy();
    expect(utils.Storage.find(name)?.value).toBeFalsy();

    utils.setValue(value, name);

    expect(Cookie.get(name)).toBeFalsy();
    expect(Cookie.get(utils.getPrefixedCookieName(name))).toEqual(value);
    expect(utils.Storage.find(name)?.value).toEqual(value);
  });

  [CONSTANTS.subid.name, CONSTANTS.cashback.name].forEach((configName) => {
    test(`setValue - Should compress value when store ${configName}`, () => {
      const value = JSON.stringify({ foo: 'bar' });
      const compressedValue = compress(value);

      expect(Cookie.get(configName)).toBeFalsy();
      expect(Cookie.get(utils.getPrefixedCookieName(configName))).toBeFalsy();
      expect(utils.Storage.find(configName)?.value).toBeFalsy();
      expect(utils.getValue(configName)).toBeFalsy();

      utils.setValue(value, configName);

      expect(Cookie.get(configName)).toBeFalsy();
      expect(Cookie.get(utils.getPrefixedCookieName(configName))).toEqual(compressedValue);
      expect(utils.Storage.find(configName)?.value).toEqual(compressedValue);
      expect(utils.getValue(configName)).toEqual(value);
    });
  });

  test('getValue - Should return value from cookie first', () => {
    const value = 'bar';

    expect(Cookie.get(name)).toBeFalsy();
    expect(Cookie.get(utils.getPrefixedCookieName(name))).toBeFalsy();
    expect(utils.Storage.find(name)?.value).toBeFalsy();

    expect(utils.getValue(name)).toBeFalsy();

    Cookie.set(utils.getPrefixedCookieName(name), value);

    expect(utils.getValue(name)).toEqual(value);
  });

  test('getValue - Should return value from localstorage when cookie not set', () => {
    const value = 'bar';

    expect(Cookie.get(name)).toBeFalsy();
    expect(Cookie.get(utils.getPrefixedCookieName(name))).toBeFalsy();
    expect(utils.Storage.find(name)?.value).toBeFalsy();

    expect(utils.getValue(name)).toBeFalsy();

    utils.Storage.save({ id: name, value });

    expect(utils.getValue(name)).toEqual(value);
  });

  test('getValue - Should return falsy when nothing set', () => {
    expect(utils.getValue(name)).toBeFalsy();
  });

  test('getValue - Should return value from cookie when localstorage is removed manually', () => {
    const value = 'bar';

    utils.setValue(value, name);

    expect(Cookie.get(utils.getPrefixedCookieName(name))).toEqual(value);
    expect(utils.Storage.find(name)?.value).toEqual(value);
    expect(utils.getValue(name)).toEqual(value);

    utils.Storage.delete(name);

    expect(utils.Storage.find(name)?.value).toBeFalsy();

    expect(utils.getValue(name)).toEqual(value);
  });

  test('getValue - Should return value from localstorage when cookie is removed manually', () => {
    const value = 'bar';

    utils.setValue(value, name);

    expect(Cookie.get(utils.getPrefixedCookieName(name))).toEqual(value);
    expect(utils.Storage.find(name)?.value).toEqual(value);
    expect(utils.getValue(name)).toEqual(value);

    Cookie.remove(utils.getPrefixedCookieName(name));

    expect(Cookie.get(utils.getPrefixedCookieName(name))).toBeFalsy();

    expect(utils.getValue(name)).toEqual(value);
  });

  test('removeValue - Should remove a specific cookie and localstorage value when called', () => {
    const value = 'bar';
    const notRemoveValueName = 'do_not_remove_me';

    utils.setValue(value, name);
    utils.setValue(value, notRemoveValueName);

    expect(utils.getValue(name)).toEqual(value);
    expect(utils.getValue(notRemoveValueName)).toEqual(value);

    utils.removeValue(name);

    expect(utils.getValue(name)).toBeFalsy();

    expect(utils.getValue(notRemoveValueName)).toEqual(value);
    expect(Cookie.get(utils.getPrefixedCookieName(notRemoveValueName))).toEqual(value);
    expect(utils.Storage.find(notRemoveValueName)?.value).toEqual(value);
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
    const subidSize = CONSTANTS.cookieMaxSize / ttlInDays;
    const olderSubidKey = '_lastone';
    const subidsEntries = [...Array(ttlInDays)].map((_, i) => [
      i !== 0 ? randomString(subidSize) : `${randomString(subidSize)}${olderSubidKey}`,
      utils.getCurrentTimestamp() - utils.getTimestampFromTTL(ttlInDays - i + 1),
    ]);

    const subids = Object.fromEntries(subidsEntries);

    expect(JSON.stringify(subids).length).toBeGreaterThanOrEqual(CONSTANTS.cookieMaxSize);
    expect(subidsEntries.some((subid) => subid.indexOf(olderSubidKey))).toBeTruthy();

    const limitedSubids = utils.getMaxSubids(subids);

    expect(JSON.stringify(limitedSubids).length).toBeLessThanOrEqual(CONSTANTS.cookieMaxSize);
    expect(Object.entries(limitedSubids).some((subid) => subid.indexOf(olderSubidKey))).toBeTruthy();
  });

  test('SubidCookieTypeError - Should throw custom error message', () => {
    const subidName = 'foo';
    expect(() => {
      throw new utils.SubidCookieTypeError(subidName);
    }).toThrow(`Cookie to_${subidName} or is a string. Expected object`);
  });

  describe('Retrocompatibility', () => {
    [CONSTANTS.subid.name, CONSTANTS.cashback.name].forEach((configName) => {
      beforeEach(() => {
        utils.removeValue(configName);
      });

      test(`getValue - Should not uncompress an existing ${configName} value not compressed from Cookie`, () => {
        const value = 'bar';
        const compressedValue = compress(value);

        Cookie.set(utils.getPrefixedCookieName(configName), value);

        expect(Cookie.get(configName)).toBeFalsy();
        expect(utils.Storage.find(configName)?.value).toBeFalsy();
        expect(Cookie.get(utils.getPrefixedCookieName(configName))).toEqual(value);

        expect(utils.getValue(configName)).not.toEqual(compressedValue);
        expect(utils.getValue(configName)).toEqual(value);
      });

      test(`getValue - Should not uncompress an existing ${configName} value not compressed from Storage`, () => {
        const value = 'bar';
        const compressedValue = compress(value);

        utils.Storage.save({ id: configName, value });

        expect(Cookie.get(configName)).toBeFalsy();
        expect(Cookie.get(utils.getPrefixedCookieName(configName))).toBeFalsy();
        expect(utils.Storage.find(configName)?.value).toEqual(value);

        expect(utils.getValue(configName)).not.toEqual(compressedValue);
        expect(utils.getValue(configName)).toEqual(value);
      });
    });
  });
});
