/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-unresolved
import { expect } from 'expect';
import Cookie from 'js-cookie';

import Sdk from './Sdk.mjs';
import * as utils from './utils.mjs';
import CONSTANTS from './constants.mjs';

const progids = [109];
const minimumConvertPayload = { progid: progids[0], comid: 123, iu: 456 };
const noConsentValues = [CONSTANTS.consent.status.unknown, CONSTANTS.consent.status.optout];
const eventsName = ['_setUnknown', '_setOptin', '_setOptout'];
const conversionUrls = ['https://fake-api/v1/b', 'https://fallback-fake-api/v1/b'];

const noConsentMethods = [
  { methodName: '_setUnknown', consentName: CONSTANTS.consent.status.unknown },
  { methodName: '_setOptout', consentName: CONSTANTS.consent.status.optout },
];
const conversionMethods = ['_setSale', '_setLead', '_setDbClick', '_setClick'];

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
    });

    test('constructor - Should not set subid when no consent', () => {
      Sdk.getProgramDataFromQueryParams = jest.fn((name) =>
        name === CONSTANTS.subid.queryname ? 'subib_12345' : null
      );

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      //
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(1);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.subid).toBeFalsy();
    });

    test('constructor - Should set cashbackSubid when no consent', () => {
      const cashbackSubid = 'cashback_12345';
      Sdk.getProgramDataFromQueryParams = jest.fn((name) =>
        name === CONSTANTS.cashback.queryname ? cashbackSubid : null
      );
      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(1);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.subid).toBeFalsy();
      expect(instance.cashbackSubid).toEqual(cashbackSubid);
    });

    noConsentValues.forEach((consent) => {
      test(`constructor - Should not set subid when consent is ${consent}`, () => {
        utils.setValue(consent, CONSTANTS.consent.name);
        Sdk.getProgramDataFromQueryParams = jest.fn((name) =>
          name === CONSTANTS.subid.queryname ? 'subib_12345' : null
        );

        const instance = new Sdk();

        expect(instance.consent).toEqual(consent);
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(1);
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
        expect(instance.subid).toBeFalsy();
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

        expect(instance.subid).toBeFalsy();
        expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
        expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();
        expect(utils.getValue(CONSTANTS.subid.name)).toBeFalsy();
      });
    });

    test('method _setOptin - Should set consent to optin in cookie and localstorage and set subid from cookie and localstorage', () => {
      const subid = 'subid_123456';

      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.subid).toBeFalsy();
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
        subid: null,
        cashbackSubid: null,
        errors,
        conversionUrls,
      });
      expect(instance.subid).toBeFalsy();
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
        errors,
        conversionUrls,
      });

      instance.push(['_setOptout']);

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optout);
      expect(instance.getTrace()).toEqual({
        env: 'test',
        progids,
        consent: CONSTANTS.consent.status.optout,
        subid: null,
        cashbackSubid: null,
        errors,
        conversionUrls,
      });
    });
  });

  describe('Conversions', () => {
    conversionMethods.forEach((method) => {
      test(`method ${method} - Should not do a conversion when consent is not set and subid not defined`, () => {
        Sdk.getProgramDataFromQueryParams = jest.fn(() => null);

        const instance = new Sdk();

        instance.push([method, minimumConvertPayload]);
        expect(fetch).toHaveBeenCalledTimes(0);
      });

      test(`method ${method} - Should do a conversion when consent is not set but subid defined in queryparams`, () => {
        const subid = 'subid_123456';

        Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

        const instance = new Sdk();

        instance.push([method, minimumConvertPayload]);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({
            ...minimumConvertPayload,
            toSubids: [{ type: 'consent', value: subid }],
          }),
        });
      });

      test(`method ${method} - Should do a conversion when consent is not set but cashback defined in queryparams`, () => {
        const subid = 'subid_123456';
        const cashbackSubid = 'cashback_subid_123456';

        const queryparams = {
          [CONSTANTS.subid.queryname]: subid,
          [CONSTANTS.cashback.queryname]: cashbackSubid,
        };

        Sdk.getProgramDataFromQueryParams = jest.fn((name) => queryparams[name]);

        const instance = new Sdk();

        instance.push([method, minimumConvertPayload]);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({
            ...minimumConvertPayload,
            toSubids: [
              { type: 'consent', value: subid },
              { type: 'cashback', value: cashbackSubid },
            ],
          }),
        });
      });

      test(`method ${method} - Should do a conversion when consent is not set but subid and cashback defined in queryparams`, () => {
        const cashbackSubid = 'cashback_subid_123456';

        Sdk.getProgramDataFromQueryParams = jest.fn((name) =>
          name === CONSTANTS.cashback.queryname ? cashbackSubid : null
        );

        const instance = new Sdk();

        instance.push([method, minimumConvertPayload]);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({
            ...minimumConvertPayload,
            toSubids: [{ type: 'cashback', value: cashbackSubid }],
          }),
        });
      });

      noConsentMethods.forEach(({ methodName: consentMethodName, consentName }) => {
        test(`method ${method} - Should not do a conversion when consent is ${consentName} and subid not defined in queryparams`, () => {
          Sdk.getProgramDataFromQueryParams = jest.fn(() => null);

          const instance = new Sdk();

          instance.push([consentMethodName]);
          instance.push([method, minimumConvertPayload]);

          expect(instance.consent).toEqual(consentName);
          expect(fetch).toHaveBeenCalledTimes(0);
        });

        Object.keys(minimumConvertPayload).forEach((key) => {
          test(`method ${method} - Should not do a conversion when consent ${consentName} and subid not defined in queryparams but payload missing ${key}`, () => {
            const subid = 'subid_123456';
            const { [key]: missingKey, ...badPayload } = minimumConvertPayload;

            Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

            const instance = new Sdk();

            instance.push([consentMethodName]);
            instance.push([method, badPayload]);

            expect(instance.consent).toEqual(consentName);
            expect(fetch).toHaveBeenCalledTimes(0);
          });
        });

        test(`method ${method} - Should do a conversion when consent is ${consentName} but subid defined in queryparams`, () => {
          const subid = 'subid_123456';

          Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

          const instance = new Sdk();

          instance.push([consentMethodName]);
          instance.push([method, minimumConvertPayload]);

          expect(instance.consent).toEqual(consentName);
          expect(fetch).toHaveBeenCalledTimes(1);
          expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', accept: 'application/json' },
            body: JSON.stringify({
              ...minimumConvertPayload,
              toSubids: [{ type: 'consent', value: subid }],
            }),
          });
        });

        test(`method ${method} - Should do a conversion when consent is ${consentName} but cashback defined in queryparams`, () => {
          const cashbackSubid = 'cashback_subid_123456';

          Sdk.getProgramDataFromQueryParams = jest.fn((name) =>
            name === CONSTANTS.cashback.queryname ? cashbackSubid : null
          );

          const instance = new Sdk();

          instance.push([consentMethodName]);
          instance.push([method, minimumConvertPayload]);

          expect(instance.consent).toEqual(consentName);
          expect(fetch).toHaveBeenCalledTimes(1);
          expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', accept: 'application/json' },
            body: JSON.stringify({
              ...minimumConvertPayload,
              toSubids: [{ type: 'cashback', value: cashbackSubid }],
            }),
          });
        });

        test(`method ${method} - Should do a conversion when consent is ${consentName} but subid and cashback defined in queryparams`, () => {
          const subid = 'subid_123456';
          const cashbackSubid = 'cashback_subid_123456';

          const queryparams = {
            [CONSTANTS.subid.queryname]: subid,
            [CONSTANTS.cashback.queryname]: cashbackSubid,
          };

          Sdk.getProgramDataFromQueryParams = jest.fn((name) => queryparams[name]);

          const instance = new Sdk();

          instance.push([consentMethodName]);
          instance.push([method, minimumConvertPayload]);

          expect(instance.consent).toEqual(consentName);
          expect(fetch).toHaveBeenCalledTimes(1);
          expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', accept: 'application/json' },
            body: JSON.stringify({
              ...minimumConvertPayload,
              toSubids: [
                { type: 'consent', value: subid },
                { type: 'cashback', value: cashbackSubid },
              ],
            }),
          });
        });
      });

      Object.keys(minimumConvertPayload).forEach((key) => {
        test(`method ${method} - Should not do a conversion when consent optin and subid but payload missing ${key}`, () => {
          const subid = 'subid_123456';
          const { [key]: missingKey, ...badPayload } = minimumConvertPayload;

          Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

          const instance = new Sdk();
          instance.push(['_setOptin']);
          instance.push([method, badPayload]);

          expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
          expect(fetch).toHaveBeenCalledTimes(0);
        });

        test(`method ${method} - Should not do a conversion when consent optin and cashback but payload missing ${key}`, () => {
          const cashbackSubid = 'cashback_subid_123456';
          const { [key]: missingKey, ...badPayload } = minimumConvertPayload;

          Sdk.getProgramDataFromQueryParams = jest.fn((name) =>
            name === CONSTANTS.cashback.queryname ? cashbackSubid : null
          );

          const instance = new Sdk();
          instance.push(['_setOptin']);
          instance.push([method, badPayload]);

          expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
          expect(fetch).toHaveBeenCalledTimes(0);
        });

        test(`method ${method} - Should not do a conversion when consent optin and subid and cashback but payload missing ${key}`, () => {
          const subid = 'subid_123456';
          const cashbackSubid = 'cashback_subid_123456';

          const queryparams = {
            [CONSTANTS.subid.queryname]: subid,
            [CONSTANTS.cashback.queryname]: cashbackSubid,
          };

          const { [key]: missingKey, ...badPayload } = minimumConvertPayload;

          Sdk.getProgramDataFromQueryParams = jest.fn((name) => queryparams[name]);

          const instance = new Sdk();
          instance.push(['_setOptin']);
          instance.push([method, badPayload]);

          expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
          expect(fetch).toHaveBeenCalledTimes(0);
        });
      });

      test(`method ${method} - Should call first conversion url with right params when consent is optin`, () => {
        const subid = 'subid_123456';

        Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

        const instance = new Sdk();
        instance.push(['_setOptin']);
        instance.push([method, minimumConvertPayload]);

        expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({
            ...minimumConvertPayload,
            toSubids: [{ type: 'consent', value: subid }],
          }),
        });
      });

      test(`method ${method} - Should call next conversion url with right params when consent is optin and first convension failed to resolve`, (done) => {
        const subid = 'subid_123456';
        const error = 'NetworError';

        fetch.mockRejectOnce(new Error(error)).mockResponseOnce({ ok: 'ok' });

        Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

        const instance = new Sdk();

        instance.push(['_setOptin']);
        instance.push([method, minimumConvertPayload]);

        expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({
            ...minimumConvertPayload,
            toSubids: [{ type: 'consent', value: subid }],
          }),
        });

        process.nextTick(() => {
          try {
            expect(fetch).toHaveBeenCalledTimes(2);
            expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.conversion[1], {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', accept: 'application/json' },
              body: JSON.stringify({
                ...minimumConvertPayload,
                toSubids: [{ type: 'consent', value: subid }],
              }),
            });

            expect(instance.getTrace()).toEqual(
              expect.objectContaining({
                env: 'test',
                consent: CONSTANTS.consent.status.optin,
                errors: [
                  {
                    extra: {
                      ...minimumConvertPayload,
                      url: CONSTANTS.urls.conversion[0],
                    },
                    message: `While calling "${method}" method: NetworError`,
                  },
                ],
                progids,
                subid,

                conversionUrls,
              })
            );
            done();
          } catch (e) {
            done(e);
          }
        });
      });

      test(`method ${method} - Should not do a conversion when consent is optin but subid and cashback are not defined`, () => {
        const instance = new Sdk();

        instance.push(['_setOptin']);
        instance.push([method, minimumConvertPayload]);

        expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
        expect(fetch).toHaveBeenCalledTimes(0);
      });
    });
  });
});
