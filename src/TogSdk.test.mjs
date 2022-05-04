/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-unresolved
import test from 'ava';
import sinon from 'sinon';
import Cookie from 'js-cookie';

import TogSdk from './TogSdk.mjs';
import * as utils from './utils.mjs';
import CONSTANTS from './constants.mjs';

const sandbox = sinon.createSandbox();

test.beforeEach(() => {
  TogSdk.getSubidFromQueryParams = sandbox.stub();

  utils.removeValue(CONSTANTS.subid.name);
  utils.removeValue(CONSTANTS.consent.name);
});

const progid = 109;
const noConsentValues = [CONSTANTS.consent.status.unknown, CONSTANTS.consent.status.optout];
const eventsName = ['setUnknown', 'setOptin', 'setOptout'];
const noConsentMethods = [
  { methodName: 'setUnknown', consentName: CONSTANTS.consent.status.unknown },
  { methodName: 'setOptout', consentName: CONSTANTS.consent.status.optout },
];

test('constructor - Should set default values', (t) => {
  t.falsy(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name)));
  t.falsy(utils.Storage.find(CONSTANTS.consent.name)?.value);

  t.falsy(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)));
  t.falsy(utils.Storage.find(CONSTANTS.subid.name)?.value);

  const instance = new TogSdk();

  t.deepEqual(instance.consent, CONSTANTS.consent.status.unknown);
  t.falsy(instance.subid);
});

test('constructor - Should set consent from cookie', (t) => {
  const consent = CONSTANTS.consent.status.optout;

  Cookie.set(utils.getPrefixedCookieName(CONSTANTS.consent.name), consent);
  t.falsy(utils.Storage.find(CONSTANTS.consent.name)?.value);

  t.falsy(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)));
  t.falsy(utils.Storage.find(CONSTANTS.subid.name)?.value);

  const instance = new TogSdk();

  t.deepEqual(instance.consent, consent);
  t.falsy(instance.subid);
});

test('constructor - Should set consent from localstorage', (t) => {
  const consent = CONSTANTS.consent.status.optout;

  utils.Storage.save({ id: CONSTANTS.consent.name, value: consent });

  t.falsy(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name)));

  t.falsy(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)));
  t.falsy(utils.Storage.find(CONSTANTS.subid.name)?.value);

  const instance = new TogSdk();

  t.deepEqual(instance.consent, consent);
  t.falsy(instance.subid);
});

test('constructor - Should not set subid if no consent', (t) => {
  TogSdk.getSubidFromQueryParams = sandbox.stub().returns('12345');

  const instance = new TogSdk();

  t.deepEqual(instance.consent, CONSTANTS.consent.status.unknown);
  t.deepEqual(instance.constructor.getSubidFromQueryParams.callCount, 0);
  t.falsy(instance.subid);
});

noConsentValues.forEach((consent) => {
  test(`constructor - Should not set subid if consent is ${consent}`, (t) => {
    utils.setValue(consent, CONSTANTS.consent.name);
    TogSdk.getSubidFromQueryParams = sandbox.stub().returns('678');

    const instance = new TogSdk();

    t.deepEqual(instance.consent, consent);
    t.deepEqual(instance.constructor.getSubidFromQueryParams.callCount, 0);
    t.falsy(instance.subid);
  });
});

test('constructor - Should remove subid from storage if no consent', (t) => {
  const subid = '123';
  utils.setValue(subid, CONSTANTS.subid.name);

  t.deepEqual(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)), subid);
  t.deepEqual(utils.Storage.find(CONSTANTS.subid.name)?.value, subid);

  const instance = new TogSdk();

  t.deepEqual(instance.consent, CONSTANTS.consent.status.unknown);
  t.falsy(instance.subid);
  t.falsy(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)));
  t.falsy(utils.Storage.find(CONSTANTS.subid.name)?.value);
});

noConsentValues.forEach((consent) => {
  test(`constructor - Should remove subid from storage if consent stored is ${consent}`, (t) => {
    const subid = '123';
    utils.setValue(subid, CONSTANTS.subid.name);

    t.deepEqual(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)), subid);
    t.deepEqual(utils.Storage.find(CONSTANTS.subid.name)?.value, subid);

    utils.setValue(consent, CONSTANTS.consent.name);

    t.deepEqual(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name)), consent);
    t.deepEqual(utils.Storage.find(CONSTANTS.consent.name)?.value, consent);

    const instance = new TogSdk();

    t.deepEqual(instance.consent, consent);
    t.falsy(instance.subid);
    t.falsy(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)));
    t.falsy(utils.Storage.find(CONSTANTS.subid.name)?.value);
  });
});

test('constructor - Should no set subid if consent optin but no subid queryparams or storage', (t) => {
  utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
  TogSdk.getSubidFromQueryParams = sandbox.stub().returns();

  const instance = new TogSdk();

  t.deepEqual(instance.consent, CONSTANTS.consent.status.optin);
  t.deepEqual(instance.constructor.getSubidFromQueryParams.callCount, 1);
  t.falsy(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)));
  t.falsy(utils.Storage.find(CONSTANTS.subid.name)?.value);
  t.falsy(instance.subid);
});

test('constructor - Should set subid if consent optin and queryparams subid', (t) => {
  utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
  const subid = '123456';

  TogSdk.getSubidFromQueryParams = sandbox.stub().returns(subid);

  const instance = new TogSdk();

  t.deepEqual(instance.consent, CONSTANTS.consent.status.optin);
  t.deepEqual(instance.constructor.getSubidFromQueryParams.callCount, 1);
  t.deepEqual(instance.subid, subid);
  t.deepEqual(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)), subid);
  t.deepEqual(utils.Storage.find(CONSTANTS.subid.name)?.value, subid);
  t.deepEqual(utils.getValue(CONSTANTS.subid.name), subid);
});

test('constructor - Should set subid if consent optin and subid in cookie', (t) => {
  const subid = '1234567';

  utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
  Cookie.set(utils.getPrefixedCookieName(CONSTANTS.subid.name), subid);
  TogSdk.getSubidFromQueryParams = sandbox.stub().returns();

  t.falsy(utils.Storage.find(CONSTANTS.subid.name)?.value);

  const instance = new TogSdk();

  t.deepEqual(instance.consent, CONSTANTS.consent.status.optin);
  t.deepEqual(instance.constructor.getSubidFromQueryParams.callCount, 1);
  t.deepEqual(instance.subid, subid);
  t.deepEqual(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)), subid);
  t.deepEqual(utils.getValue(CONSTANTS.subid.name), subid);
});

test('constructor - Should set subid if consent optin and subid in localstorage', (t) => {
  const subid = '12345678';

  utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
  utils.Storage.save({ id: CONSTANTS.subid.name, value: subid });
  TogSdk.getSubidFromQueryParams = sandbox.stub().returns();

  t.falsy(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)));

  const instance = new TogSdk();

  t.deepEqual(instance.consent, CONSTANTS.consent.status.optin);
  t.deepEqual(instance.constructor.getSubidFromQueryParams.callCount, 1);
  t.deepEqual(instance.subid, subid);
  t.deepEqual(utils.Storage.find(CONSTANTS.subid.name)?.value, subid);
  t.deepEqual(utils.getValue(CONSTANTS.subid.name), subid);
});

test('constructor - Should set subid from queryparams if consent optin, subid in cookie and in queryparams', (t) => {
  const querySubid = '123456';
  const cookieSubid = '78910';

  utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
  Cookie.set(utils.getPrefixedCookieName(CONSTANTS.subid.name), cookieSubid);
  TogSdk.getSubidFromQueryParams = sandbox.stub().returns(querySubid);

  t.falsy(utils.Storage.find(CONSTANTS.subid.name)?.value);

  const instance = new TogSdk();

  t.deepEqual(instance.consent, CONSTANTS.consent.status.optin);
  t.deepEqual(instance.constructor.getSubidFromQueryParams.callCount, 1);
  t.deepEqual(instance.subid, querySubid);
  t.deepEqual(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)), querySubid);
  t.deepEqual(utils.getValue(CONSTANTS.subid.name), querySubid);
});

test('constructor - Should set subid from queryparams if consent optin, subid in localstorage and in queryparams', (t) => {
  const querySubid = '123456';
  const storageSubid = '78910';

  utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
  utils.Storage.save({ id: CONSTANTS.subid.name, value: storageSubid });
  TogSdk.getSubidFromQueryParams = sandbox.stub().returns(querySubid);

  t.falsy(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)));

  const instance = new TogSdk();

  t.deepEqual(instance.consent, CONSTANTS.consent.status.optin);
  t.deepEqual(instance.constructor.getSubidFromQueryParams.callCount, 1);
  t.deepEqual(instance.subid, querySubid);
  t.deepEqual(utils.Storage.find(CONSTANTS.subid.name)?.value, querySubid);
  t.deepEqual(utils.getValue(CONSTANTS.subid.name), querySubid);
});

test('method push - Should throws an error eventName does not match class method', (t) => {
  const unknownMethod = 'unknownMethod';
  const error = t.throws(
    () => {
      const instance = new TogSdk();

      instance.push([unknownMethod]);
    },
    { instanceOf: Error }
  );

  t.is(error.message, `Undefined function ${unknownMethod}`);
});

eventsName.forEach((eventName) => {
  test(`method push - Should call ${eventName} method when ${eventName} event is pushed`, (t) => {
    const instance = new TogSdk();

    instance[eventName] = sandbox.stub().returns();

    instance.push([eventName]);
    t.deepEqual(instance[eventName].callCount, 1);
  });
});

noConsentMethods.forEach(({ methodName, consentName }) => {
  test(`method ${methodName} - Should set consent to ${consentName} in cookie and localstorage and remove subid from cookie and localstorage`, (t) => {
    utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
    const subid = '123456';
    TogSdk.getSubidFromQueryParams = sandbox.stub().returns(subid);

    const instance = new TogSdk();

    t.deepEqual(instance.consent, CONSTANTS.consent.status.optin);
    t.falsy(instance.progid);
    t.deepEqual(instance.subid, subid);
    t.deepEqual(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)), subid);
    t.deepEqual(utils.Storage.find(CONSTANTS.subid.name)?.value, subid);

    instance[methodName]({ progid: 109 });

    t.deepEqual(instance.consent, consentName);
    t.deepEqual(instance.progid, progid);
    t.deepEqual(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name)), consentName);
    t.deepEqual(utils.Storage.find(CONSTANTS.consent.name)?.value, consentName);

    t.falsy(instance.subid);
    t.falsy(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)));
    t.falsy(utils.Storage.find(CONSTANTS.subid.name)?.value);
    t.falsy(utils.getValue(CONSTANTS.subid.name));
  });
});

test('method setOptin - Should set consent to optin in cookie and localstorage and set subid from cookie and localstorage', (t) => {
  const subid = '123456';

  TogSdk.getSubidFromQueryParams = sandbox.stub().returns(subid);

  const instance = new TogSdk();

  t.deepEqual(instance.consent, CONSTANTS.consent.status.unknown);
  t.falsy(instance.progid);
  t.falsy(instance.subid);
  t.falsy(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)));
  t.falsy(utils.Storage.find(CONSTANTS.subid.name)?.value);

  instance.setOptin({ progid });

  t.deepEqual(instance.progid, progid);
  t.deepEqual(instance.consent, CONSTANTS.consent.status.optin);
  t.deepEqual(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name)), CONSTANTS.consent.status.optin);
  t.deepEqual(utils.Storage.find(CONSTANTS.consent.name)?.value, CONSTANTS.consent.status.optin);

  t.deepEqual(instance.subid, subid);
  t.deepEqual(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)), subid);
  t.deepEqual(utils.Storage.find(CONSTANTS.subid.name)?.value, subid);
  t.deepEqual(utils.getValue(CONSTANTS.subid.name), subid);
});

test('method getTrace - Should store a trace in localstorage when consent change', (t) => {
  const subid = '123456789';

  TogSdk.getSubidFromQueryParams = sandbox.stub().returns(subid);

  const instance = new TogSdk();

  t.deepEqual(instance.consent, CONSTANTS.consent.status.unknown);
  t.deepEqual(utils.Storage.find(CONSTANTS.trace.name)?.value, {
    consent: CONSTANTS.consent.status.unknown,
    subid: null,
  });
  t.falsy(instance.progid);
  t.falsy(instance.subid);

  instance.setOptin({ progid });

  t.deepEqual(instance.progid, progid);
  t.deepEqual(instance.consent, CONSTANTS.consent.status.optin);
  t.deepEqual(instance.subid, subid);
  t.deepEqual(utils.Storage.find(CONSTANTS.trace.name)?.value, {
    consent: CONSTANTS.consent.status.optin,
    subid,
    progid,
  });

  instance.setOptout({ progid });

  t.deepEqual(instance.progid, progid);
  t.deepEqual(instance.consent, CONSTANTS.consent.status.optout);
  t.falsy(instance.subid);
  t.deepEqual(utils.Storage.find(CONSTANTS.trace.name)?.value, {
    consent: CONSTANTS.consent.status.optout,
    subid: null,
    progid,
  });
});
