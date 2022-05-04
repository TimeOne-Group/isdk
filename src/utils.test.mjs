import Cookie from 'js-cookie';

import * as utils from './utils.mjs';
import CONSTANTS from './constants.mjs';

const name = 'foo';

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
