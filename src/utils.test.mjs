// eslint-disable-next-line import/no-unresolved
import test from 'ava';
import Cookie from 'js-cookie';

import * as utils from './utils.mjs';
import CONSTANTS from './constants.mjs';

const name = 'foo';

test.beforeEach(() => {
  utils.removeValue(name);
});

test('getPrefixedCookieName - Should return prefixed name', (t) => {
  t.deepEqual(`${CONSTANTS.default_storage_prefix}_${name}`, utils.getPrefixedCookieName(name));
});

test('setValue - Should set cookie and localstorage when called', (t) => {
  const value = 'bar';

  t.falsy(Cookie.get(name));
  t.falsy(Cookie.get(utils.getPrefixedCookieName(name)));
  t.falsy(utils.Storage.find(name)?.value);

  utils.setValue(value, name);

  t.falsy(Cookie.get(name));
  t.deepEqual(Cookie.get(utils.getPrefixedCookieName(name)), value);
  t.deepEqual(utils.Storage.find(name)?.value, value);
});

test('getValue - Should return value from cookie first', (t) => {
  const value = 'bar';

  t.falsy(Cookie.get(name));
  t.falsy(Cookie.get(utils.getPrefixedCookieName(name)));
  t.falsy(utils.Storage.find(name)?.value);

  t.falsy(utils.getValue(name));

  Cookie.set(utils.getPrefixedCookieName(name), value);

  t.deepEqual(utils.getValue(name), value);
});

test('getValue - Should return value from localstorage when cookie not set', (t) => {
  const value = 'bar';

  t.falsy(Cookie.get(name));
  t.falsy(Cookie.get(utils.getPrefixedCookieName(name)));
  t.falsy(utils.Storage.find(name)?.value);

  t.falsy(utils.getValue(name));

  utils.Storage.save({ id: name, value });

  t.deepEqual(utils.getValue(name), value);
});

test('getValue - Should return falsy when nothing set', (t) => {
  t.falsy(utils.getValue(name));
});

test('getValue - Should return value from cookie when localstorage is removed manually', (t) => {
  const value = 'bar';

  utils.setValue(value, name);

  t.deepEqual(Cookie.get(utils.getPrefixedCookieName(name)), value);
  t.deepEqual(utils.Storage.find(name)?.value, value);
  t.deepEqual(utils.getValue(name), value);

  utils.Storage.delete(name);

  t.falsy(utils.Storage.find(name)?.value);

  t.deepEqual(utils.getValue(name), value);
});

test('getValue - Should return value from localstorage when cookie is removed manually', (t) => {
  const value = 'bar';

  utils.setValue(value, name);

  t.deepEqual(Cookie.get(utils.getPrefixedCookieName(name)), value);
  t.deepEqual(utils.Storage.find(name)?.value, value);
  t.deepEqual(utils.getValue(name), value);

  Cookie.remove(utils.getPrefixedCookieName(name));

  t.falsy(Cookie.get(utils.getPrefixedCookieName(name)));

  t.deepEqual(utils.getValue(name), value);
});

test('removeValue - Should remove a specific cookie and localstorage value when called', (t) => {
  const value = 'bar';
  const notRemoveValueName = 'do_not_remove_me';

  utils.setValue(value, name);
  utils.setValue(value, notRemoveValueName);

  t.deepEqual(utils.getValue(name), value);
  t.deepEqual(utils.getValue(notRemoveValueName), value);

  utils.removeValue(name);

  t.falsy(utils.getValue(name));

  t.deepEqual(utils.getValue(notRemoveValueName), value);
  t.deepEqual(Cookie.get(utils.getPrefixedCookieName(notRemoveValueName)), value);
  t.deepEqual(utils.Storage.find(notRemoveValueName)?.value, value);
});
