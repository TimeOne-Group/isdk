/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-unresolved
import { expect } from 'expect';
import Cookie from 'js-cookie';

import Sdk from '../Sdk.mjs';
import * as utils from '../utils.mjs';
import CONSTANTS from '../constants.mjs';

const progids = [109];
const event_consent_id = '993be906-9074-499a-aeb6-5af4e627aa06';

const noConsentValues = [CONSTANTS.consent.status.unknown, CONSTANTS.consent.status.optout];
const eventsName = ['_setUnknown', '_setOptin', '_setOptout'];
const conversionUrls = CONSTANTS.urls.conversion;

const apiOptions = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const defaultPayload = { progid: progids[0] };

const noConsentMethods = [
  { methodName: '_setUnknown', consentName: CONSTANTS.consent.status.unknown },
  { methodName: '_setOptout', consentName: CONSTANTS.consent.status.optout },
];

beforeEach(() => {
  Sdk.getProgramDataFromQueryParams = jest.fn();
  fetch.resetMocks();
  document.getElementById = jest.fn(() => ({
    getAttribute: () => JSON.stringify(progids),
  }));
  utils.removeValue(CONSTANTS.subid.name);
  utils.removeValue(CONSTANTS.cashback.name);
  utils.removeValue(CONSTANTS.consent.name);
});

describe('The ISDK class test', () => {
  describe('Consent', () => {
    test('constructor - Should set default values', () => {
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name))).toBeFalsy();
      expect(utils.Storage.find(CONSTANTS.consent.name)?.value).toBeFalsy();

      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.subid).toBeFalsy();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          type: CONSTANTS.stats.type.visit,
          ...defaultPayload,
          status: CONSTANTS.consent.status.unknown,
          toSubids: [],
        }),
      });
    });

    test('constructor - Should set consent from cookie', () => {
      const consent = CONSTANTS.consent.status.optout;

      Cookie.set(utils.getPrefixedCookieName(CONSTANTS.consent.name), consent);
      expect(utils.Storage.find(CONSTANTS.consent.name)?.value).toBeFalsy();

      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)));
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(consent);
      expect(instance.subid).toBeFalsy();
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('constructor - Should set consent from localstorage', () => {
      const consent = CONSTANTS.consent.status.optout;

      utils.Storage.save({ id: CONSTANTS.consent.name, value: consent });

      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name))).toBeFalsy();

      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(consent);
      expect(instance.subid).toBeFalsy();
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('constructor - Should set cashbackSubid  from queryparams when no consent', () => {
      const cashbackSubid = 'cashback_12345';
      Sdk.getProgramDataFromQueryParams = jest.fn((name) =>
        name === CONSTANTS.cashback.queryname ? cashbackSubid : null
      );
      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.subid).toBeFalsy();
      expect(instance.cashbackSubid).toEqual(cashbackSubid);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          type: CONSTANTS.stats.type.visit,
          ...defaultPayload,
          status: CONSTANTS.consent.status.unknown,
          toSubids: [cashbackSubid],
        }),
      });
    });

    noConsentValues.forEach((consent) => {
      test(`constructor - Should not set subid when consent is ${consent}`, () => {
        utils.setValue(consent, CONSTANTS.consent.name);

        const instance = new Sdk();

        expect(instance.consent).toEqual(consent);
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(1);
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
        expect(instance.subid).toBeFalsy();
        expect(fetch).toHaveBeenCalledTimes(0);
      });

      test(`constructor - Should set subid from queryparams when consent is ${consent}`, () => {
        const subid = 'subib_12345';
        utils.setValue(consent, CONSTANTS.consent.name);
        Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

        const instance = new Sdk();

        expect(instance.consent).toEqual(consent);
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(1);
        expect(instance.subid).toEqual(subid);
        expect(fetch).toHaveBeenCalledTimes(0);
      });
    });

    test('constructor - Should remove subid from storage when no consent', () => {
      const subid = 'subid_123';
      utils.setValue(subid, CONSTANTS.subid.name);

      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(subid);
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(subid);

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.subid).toBeFalsy();
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();
    });

    noConsentValues.forEach((consent) => {
      test(`constructor - Should remove subid from storage when consent stored is ${consent}`, () => {
        const subid = 'subid_123';
        utils.setValue(subid, CONSTANTS.subid.name);

        expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(subid);
        expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(subid);

        utils.setValue(consent, CONSTANTS.consent.name);

        expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name))).toEqual(consent);
        expect(utils.Storage.find(CONSTANTS.consent.name)?.value).toEqual(consent);

        const instance = new Sdk();

        expect(instance.consent).toEqual(consent);
        expect(instance.subid).toBeFalsy();
        expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
        expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();
      });
    });

    test('constructor - Should no set subid when consent optin but no subid queryparams or storage', () => {
      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      Sdk.getProgramDataFromQueryParams = jest.fn(() => null);

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();
      expect(instance.subid).toBeFalsy();
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('constructor - Should set subid when consent optin and queryparams subid', () => {
      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      const subid = 'subid_123456';

      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.subid).toEqual(subid);
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(subid);
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(subid);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(subid);
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('constructor - Should set subid when consent optin and subid in cookie', () => {
      const subid = 'subid_1234567';

      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      Cookie.set(utils.getPrefixedCookieName(CONSTANTS.subid.name), subid);
      Sdk.getProgramDataFromQueryParams = jest.fn(() => null);

      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.subid).toEqual(subid);
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(subid);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(subid);
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('constructor - Should set subid when consent optin and subid in localstorage', () => {
      const subid = 'subid_12345678';

      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      utils.Storage.save({ id: CONSTANTS.subid.name, value: subid });
      Sdk.getProgramDataFromQueryParams = jest.fn(() => null);

      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.subid).toEqual(subid);
      expect(instance.cashbackSubid).toBeFalsy();
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(subid);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(subid);
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('constructor - Should set subid from queryparams when consent optin, subid in cookie and in queryparams', () => {
      const querySubid = '123456';
      const cookieSubid = '78910';

      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      Cookie.set(utils.getPrefixedCookieName(CONSTANTS.subid.name), cookieSubid);
      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? querySubid : null));

      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.subid).toEqual(querySubid);
      expect(instance.cashbackSubid).toBeFalsy();
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(querySubid);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(querySubid);
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('constructor - Should set subid from queryparams when consent optin, subid in localstorage and in queryparams', () => {
      const querySubid = '123456';
      const storageSubid = '78910';

      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      utils.Storage.save({ id: CONSTANTS.subid.name, value: storageSubid });
      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? querySubid : null));

      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.cashbackSubid).toBeFalsy();
      expect(instance.subid).toEqual(querySubid);
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(querySubid);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(querySubid);
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('method push - Should catch and store an error when eventName does not match class method', () => {
      const unknownMethod = 'unknownMethod';
      const instance = new Sdk();

      const initialTraceErrors = instance.getTrace();
      expect(initialTraceErrors.errors.length).toEqual(0);

      expect(() => instance.push([unknownMethod])).not.toThrow();

      const traceErrors = instance.getTrace();

      expect(traceErrors.errors.length).toEqual(1);
    });

    eventsName.forEach((eventName) => {
      test(`method push - Should call ${eventName} method when ${eventName} event is pushed`, () => {
        const instance = new Sdk();

        instance[eventName] = jest.fn(() => null);

        instance.push([eventName]);
        expect(instance[eventName]).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
          ...apiOptions,
          body: JSON.stringify({
            type: CONSTANTS.stats.type.visit,
            ...defaultPayload,
            status: CONSTANTS.consent.status.unknown,
            toSubids: [],
          }),
        });
      });

      noConsentMethods.forEach(({ methodName, consentName }) => {
        test(`method ${methodName} - Should set consent to ${consentName} in cookie and localstorage and remove subid from cookie and localstorage`, () => {
          utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
          const subid = 'subid_123456';
          Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

          const instance = new Sdk();

          expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
          expect(instance.subid).toEqual(subid);
          expect(instance.cashbackSubid).toBeFalsy();
          expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(subid);
          expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(subid);

          instance[methodName]();

          expect(instance.consent).toEqual(consentName);
          expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name))).toEqual(consentName);
          expect(utils.Storage.find(CONSTANTS.consent.name)?.value).toEqual(consentName);

          expect(instance.subid).toEqual(subid);
          expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
          expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();
          expect(utils.getValue(CONSTANTS.subid.name)).toBeFalsy();

          expect(fetch).toHaveBeenCalledTimes(1);
          expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
            ...apiOptions,
            body: JSON.stringify({
              type: CONSTANTS.stats.type.visit,
              ...defaultPayload,
              status: consentName,
              toSubids: [subid],
            }),
          });
        });
      });
    });

    test('method _setOptin - Should set consent to optin in cookie and localstorage and set subid from cookie and localstorage', () => {
      const subid = 'subid_123456';

      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

      const instance = new Sdk();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          type: CONSTANTS.stats.type.visit,
          ...defaultPayload,
          status: CONSTANTS.consent.status.unknown,
          toSubids: [subid],
        }),
      });
      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.subid).toEqual(subid);
      expect(instance.cashbackSubid).toBeFalsy();
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

      instance.push(['_setOptin']);
      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name))).toEqual(CONSTANTS.consent.status.optin);
      expect(utils.Storage.find(CONSTANTS.consent.name)?.value).toEqual(CONSTANTS.consent.status.optin);

      expect(instance.subid).toEqual(subid);
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(subid);
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(subid);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(subid);

      expect(fetch).toHaveBeenCalledTimes(3);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          type: CONSTANTS.stats.type.visit,
          ...defaultPayload,
          status: CONSTANTS.consent.status.optin,
          toSubids: [subid],
        }),
      });
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.proofConsent[0], {
        ...apiOptions,
        body: JSON.stringify({
          event_consent_id,
          url: 'localhost/',
        }),
      });
    });

    test('method getTrace - Should store a trace when consent change', () => {
      const subid = 'subid_123456789';
      const errors = [];

      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.getTrace()).toEqual({
        env: 'test',
        progids,
        consent: CONSTANTS.consent.status.unknown,
        subid,
        cashbackSubid: null,
        event_consent_id: null,
        errors,
        conversionUrls,
      });
      expect(instance.subid).toEqual(subid);
      expect(instance.cashbackSubid).toBeFalsy();
      instance.push(['_setOptin']);

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.subid).toEqual(subid);
      expect(instance.getTrace()).toEqual({
        env: 'test',
        progids,
        consent: CONSTANTS.consent.status.optin,
        subid,
        cashbackSubid: null,
        event_consent_id,
        errors,
        conversionUrls,
      });

      instance.push(['_setOptout']);

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optout);
      expect(instance.getTrace()).toEqual({
        env: 'test',
        progids,
        consent: CONSTANTS.consent.status.optout,
        subid,
        cashbackSubid: null,
        event_consent_id: null,
        errors,
        conversionUrls,
      });
    });
  });
});
