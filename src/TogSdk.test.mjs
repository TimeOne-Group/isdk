/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-unresolved
import sinon from 'sinon';
import { expect } from 'expect';
import Cookie from 'js-cookie';

import TogSdk from './TogSdk.mjs';
import * as utils from './utils.mjs';
import CONSTANTS from './constants.mjs';

const sandbox = sinon.createSandbox();

beforeEach(() => {
  TogSdk.getSubidFromQueryParams = sandbox.stub();

  utils.removeValue(CONSTANTS.subid.name);
  utils.removeValue(CONSTANTS.consent.name);
});

const progids = [109];

const noConsentValues = [CONSTANTS.consent.status.unknown, CONSTANTS.consent.status.optout];
const eventsName = ['setUnknown', 'setOptin', 'setOptout'];
const noConsentMethods = [
  { methodName: 'setUnknown', consentName: CONSTANTS.consent.status.unknown },
  { methodName: 'setOptout', consentName: CONSTANTS.consent.status.optout },
];

test('constructor - Should set default values', () => {
  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name))).toBeFalsy();
  expect(utils.Storage.find(CONSTANTS.consent.name)?.value).toBeFalsy();

  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
  expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

  const instance = new TogSdk();

  expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
  expect(instance.subid).toBeFalsy();
});

test('constructor - Should set consent from cookie', () => {
  const consent = CONSTANTS.consent.status.optout;

  Cookie.set(utils.getPrefixedCookieName(CONSTANTS.consent.name), consent);
  expect(utils.Storage.find(CONSTANTS.consent.name)?.value).toBeFalsy();

  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)));
  expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

  const instance = new TogSdk();

  expect(instance.consent).toEqual(consent);
  expect(instance.subid).toBeFalsy();
});

test('constructor - Should set consent from localstorage', () => {
  const consent = CONSTANTS.consent.status.optout;

  utils.Storage.save({ id: CONSTANTS.consent.name, value: consent });

  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name))).toBeFalsy();

  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
  expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

  const instance = new TogSdk();

  expect(instance.consent).toEqual(consent);
  expect(instance.subid).toBeFalsy();
});

test('constructor - Should not set subid if no consent', () => {
  TogSdk.getSubidFromQueryParams = sandbox.stub().returns('12345');

  const instance = new TogSdk();

  expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
  expect(instance.constructor.getSubidFromQueryParams.callCount).toEqual(0);
  expect(instance.subid).toBeFalsy();
});

noConsentValues.forEach((consent) => {
  test(`constructor - Should not set subid if consent is ${consent}`, () => {
    utils.setValue(consent, CONSTANTS.consent.name);
    TogSdk.getSubidFromQueryParams = sandbox.stub().returns('678');

    const instance = new TogSdk();

    expect(instance.consent).toEqual(consent);
    expect(instance.constructor.getSubidFromQueryParams.callCount).toEqual(0);
    expect(instance.subid).toBeFalsy();
  });
});

test('constructor - Should remove subid from storage if no consent', () => {
  const subid = '123';
  utils.setValue(subid, CONSTANTS.subid.name);

  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(subid);
  expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(subid);

  const instance = new TogSdk();

  expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
  expect(instance.subid).toBeFalsy();
  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
  expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();
});

noConsentValues.forEach((consent) => {
  test(`constructor - Should remove subid from storage if consent stored is ${consent}`, () => {
    const subid = '123';
    utils.setValue(subid, CONSTANTS.subid.name);

    expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(subid);
    expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(subid);

    utils.setValue(consent, CONSTANTS.consent.name);

    expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name))).toEqual(consent);
    expect(utils.Storage.find(CONSTANTS.consent.name)?.value).toEqual(consent);

    const instance = new TogSdk();

    expect(instance.consent).toEqual(consent);
    expect(instance.subid).toBeFalsy();
    expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
    expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();
  });
});

test('constructor - Should no set subid if consent optin but no subid queryparams or storage', () => {
  utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
  TogSdk.getSubidFromQueryParams = sandbox.stub().returns();

  const instance = new TogSdk();

  expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
  expect(instance.constructor.getSubidFromQueryParams.callCount).toEqual(1);
  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
  expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();
  expect(instance.subid).toBeFalsy();
});

test('constructor - Should set subid if consent optin and queryparams subid', () => {
  utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
  const subid = '123456';

  TogSdk.getSubidFromQueryParams = sandbox.stub().returns(subid);

  const instance = new TogSdk();

  expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
  expect(instance.constructor.getSubidFromQueryParams.callCount).toEqual(1);
  expect(instance.subid).toEqual(subid);
  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(subid);
  expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(subid);
  expect(utils.getValue(CONSTANTS.subid.name)).toEqual(subid);
});

test('constructor - Should set subid if consent optin and subid in cookie', () => {
  const subid = '1234567';

  utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
  Cookie.set(utils.getPrefixedCookieName(CONSTANTS.subid.name), subid);
  TogSdk.getSubidFromQueryParams = sandbox.stub().returns();

  expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

  const instance = new TogSdk();

  expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
  expect(instance.constructor.getSubidFromQueryParams.callCount).toEqual(1);
  expect(instance.subid).toEqual(subid);
  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(subid);
  expect(utils.getValue(CONSTANTS.subid.name)).toEqual(subid);
});

test('constructor - Should set subid if consent optin and subid in localstorage', () => {
  const subid = '12345678';

  utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
  utils.Storage.save({ id: CONSTANTS.subid.name, value: subid });
  TogSdk.getSubidFromQueryParams = sandbox.stub().returns();

  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();

  const instance = new TogSdk();

  expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
  expect(instance.constructor.getSubidFromQueryParams.callCount).toEqual(1);
  expect(instance.subid).toEqual(subid);
  expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(subid);
  expect(utils.getValue(CONSTANTS.subid.name)).toEqual(subid);
});

test('constructor - Should set subid from queryparams if consent optin, subid in cookie and in queryparams', () => {
  const querySubid = '123456';
  const cookieSubid = '78910';

  utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
  Cookie.set(utils.getPrefixedCookieName(CONSTANTS.subid.name), cookieSubid);
  TogSdk.getSubidFromQueryParams = sandbox.stub().returns(querySubid);

  expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

  const instance = new TogSdk();

  expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
  expect(instance.constructor.getSubidFromQueryParams.callCount).toEqual(1);
  expect(instance.subid).toEqual(querySubid);
  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(querySubid);
  expect(utils.getValue(CONSTANTS.subid.name)).toEqual(querySubid);
});

test('constructor - Should set subid from queryparams if consent optin, subid in localstorage and in queryparams', () => {
  const querySubid = '123456';
  const storageSubid = '78910';

  utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
  utils.Storage.save({ id: CONSTANTS.subid.name, value: storageSubid });
  TogSdk.getSubidFromQueryParams = sandbox.stub().returns(querySubid);

  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();

  const instance = new TogSdk();

  expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
  expect(instance.constructor.getSubidFromQueryParams.callCount).toEqual(1);
  expect(instance.subid).toEqual(querySubid);
  expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(querySubid);
  expect(utils.getValue(CONSTANTS.subid.name)).toEqual(querySubid);
});

// test('method push - Should throws an error eventName does not match class method', () => {
//   const unknownMethod = 'unknownMethod';
//   const error = t.throws(
//     () => {
//       const instance = new TogSdk();

//       instance.push([unknownMethod]);
//     },
//     { instanceOf: Error }
//   );

//   t.is(error.message, `Undefined function ${unknownMethod}`);
// });

eventsName.forEach((eventName) => {
  test(`method push - Should call ${eventName} method when ${eventName} event is pushed`, () => {
    const instance = new TogSdk();

    instance[eventName] = sandbox.stub().returns();

    instance.push([eventName]);
    expect(instance[eventName].callCount).toEqual(1);
  });
});

noConsentMethods.forEach(({ methodName, consentName }) => {
  test(`method ${methodName} - Should set consent to ${consentName} in cookie and localstorage and remove subid from cookie and localstorage`, () => {
    utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
    const subid = '123456';
    TogSdk.getSubidFromQueryParams = sandbox.stub().returns(subid);

    const instance = new TogSdk();

    expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
    expect(instance.subid).toEqual(subid);
    expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(subid);
    expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(subid);

    instance[methodName]();

    expect(instance.consent).toEqual(consentName);
    expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name))).toEqual(consentName);
    expect(utils.Storage.find(CONSTANTS.consent.name)?.value).toEqual(consentName);

    expect(instance.subid).toBeFalsy();
    expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
    expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();
    expect(utils.getValue(CONSTANTS.subid.name)).toBeFalsy();
  });
});

test('method setOptin - Should set consent to optin in cookie and localstorage and set subid from cookie and localstorage', () => {
  const subid = '123456';

  TogSdk.getSubidFromQueryParams = sandbox.stub().returns(subid);

  const instance = new TogSdk();

  expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
  expect(instance.subid).toBeFalsy();
  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
  expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

  instance.setOptin();
  expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name))).toEqual(CONSTANTS.consent.status.optin);
  expect(utils.Storage.find(CONSTANTS.consent.name)?.value).toEqual(CONSTANTS.consent.status.optin);

  expect(instance.subid).toEqual(subid);
  expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(subid);
  expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(subid);
  expect(utils.getValue(CONSTANTS.subid.name)).toEqual(subid);
});

test('method getTrace - Should store a trace in localstorage when consent change', () => {
  const subid = '123456789';

  document.getElementById = jest.fn(() => ({
    getAttribute: () => JSON.stringify(progids),
  }));

  TogSdk.getSubidFromQueryParams = sandbox.stub().returns(subid);

  const instance = new TogSdk();

  expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
  expect(instance.getTrace()).toEqual({
    progids,
    consent: CONSTANTS.consent.status.unknown,
    subid: null,
  });
  expect(instance.subid).toBeFalsy();

  instance.setOptin();

  expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
  expect(instance.subid).toEqual(subid);
  expect(instance.getTrace()).toEqual({
    progids,
    consent: CONSTANTS.consent.status.optin,
    subid,
  });

  instance.setOptout();

  expect(instance.consent).toEqual(CONSTANTS.consent.status.optout);
  expect(instance.getTrace()).toEqual({
    progids,
    consent: CONSTANTS.consent.status.optout,
    subid: null,
  });
});
