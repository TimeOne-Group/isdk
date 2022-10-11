/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-unresolved
import { expect } from 'expect';
import Cookie from 'js-cookie';
import LZString from 'lz-string';

import Sdk from '../Sdk.mjs';
import * as utils from '../utils.mjs';
import CONSTANTS from '../constants.mjs';

const progids = [109];
const event_consent_id = '993be906-9074-499a-aeb6-5af4e627aa06';

const noConsentValues = [CONSTANTS.consent.status.unknown, CONSTANTS.consent.status.optout];
const eventsName = ['_setUnknown', '_setOptin', '_setOptout'];
const conversionUrls = CONSTANTS.urls.conversion;

let currentTimestamp;

const apiOptions = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const defaultPayload = {
  progid: progids[0],
  // url: 'localhost/'
};

const noConsentMethods = [
  { methodName: '_setUnknown', consentName: CONSTANTS.consent.status.unknown },
  { methodName: '_setOptout', consentName: CONSTANTS.consent.status.optout },
];

function compress(subids) {
  const value = JSON.stringify(subids);
  return LZString.compressToBase64(value);
}

describe('The ISDK class test', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2022, 9, 1));

    currentTimestamp = utils.getCurrentTimestamp();
  });

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

  describe('Consent', () => {
    test('constructor - Should set default values', () => {
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name))).toBeFalsy();
      expect(utils.Storage.find(CONSTANTS.consent.name)?.value).toBeFalsy();

      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.subids).toEqual({});
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
      expect(instance.subids).toEqual({});
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
      expect(instance.subids).toEqual({});
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('constructor - Should set cashbackSubid  from queryparams when no consent', () => {
      const cashbackSubid = 'cashback_12345';
      const cashbackSubids = {
        [cashbackSubid]: currentTimestamp,
      };

      Sdk.getProgramDataFromQueryParams = jest.fn((name) =>
        name === CONSTANTS.cashback.queryname ? cashbackSubid : null
      );
      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.subids).toEqual({});
      expect(instance.cashbackSubids).toEqual(cashbackSubids);
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
        expect(instance.subids).toEqual({});
        expect(fetch).toHaveBeenCalledTimes(0);
      });

      test(`constructor - Should set subid from queryparams when consent is ${consent}`, () => {
        const subid = 'subib_12345';
        const subids = {
          [subid]: currentTimestamp,
        };

        utils.setValue(consent, CONSTANTS.consent.name);
        Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

        const instance = new Sdk();

        expect(instance.consent).toEqual(consent);
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(1);
        expect(instance.subids).toEqual(subids);
        expect(fetch).toHaveBeenCalledTimes(0);
      });
    });

    test('constructor - Should remove subid from storage when no consent', () => {
      const subid = 'subid_123';
      const subids = {
        [subid]: currentTimestamp,
      };

      const compressSubids = compress(subids);

      utils.setValue(JSON.stringify(subids), CONSTANTS.subid.name);

      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(compressSubids);
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(compressSubids);

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.subids).toEqual({});
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();
    });

    noConsentValues.forEach((consent) => {
      test(`constructor - Should remove subid from storage when consent stored is ${consent}`, () => {
        const subid = 'subid_123';
        const subids = {
          [subid]: currentTimestamp,
        };

        const compressSubids = compress(subids);

        utils.setValue(JSON.stringify(subids), CONSTANTS.subid.name);

        expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(compressSubids);
        expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(compressSubids);

        utils.setValue(consent, CONSTANTS.consent.name);

        expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name))).toEqual(consent);
        expect(utils.Storage.find(CONSTANTS.consent.name)?.value).toEqual(consent);

        const instance = new Sdk();

        expect(instance.consent).toEqual(consent);
        expect(instance.subids).toEqual({});
        expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
        expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();
      });
    });

    test('constructor - Should no set subid when consent optin but no subid queryparams or storage', () => {
      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      Sdk.getProgramDataFromQueryParams = jest.fn(() => null);

      const emptySubids = {};
      const compressEmptySubids = compress(emptySubids);

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(compressEmptySubids);
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(compressEmptySubids);
      expect(instance.subids).toEqual(emptySubids);
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('constructor - Should set subid when consent optin and queryparams subid', () => {
      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);

      const subid = 'subid_123456';
      const subids = {
        [subid]: currentTimestamp,
      };

      const compressSubids = compress(subids);

      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.subids).toEqual(subids);
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(compressSubids);
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(compressSubids);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(JSON.stringify(subids));
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('constructor - Should set subid when consent optin and subid in cookie', () => {
      const subid = 'subid_1234567';
      const subids = {
        [subid]: currentTimestamp,
      };

      const compressSubids = compress(subids);

      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      Cookie.set(utils.getPrefixedCookieName(CONSTANTS.subid.name), compressSubids);
      Sdk.getProgramDataFromQueryParams = jest.fn(() => null);

      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.subids).toEqual(subids);
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(compressSubids);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(JSON.stringify(subids));
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('constructor - Should set subid when consent optin and subid in localstorage', () => {
      const subid = 'subid_12345678';
      const subids = {
        [subid]: currentTimestamp,
      };

      const compressSubids = compress(subids);

      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      utils.Storage.save({ id: CONSTANTS.subid.name, value: compressSubids });
      Sdk.getProgramDataFromQueryParams = jest.fn(() => null);

      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.subids).toEqual(subids);
      expect(instance.cashbackSubids).toEqual({});
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(compressSubids);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(JSON.stringify(subids));
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('constructor - Should set subid from queryparams when consent optin, subid in cookie and in queryparams', () => {
      const querySubid = '123456';
      const cookieSubid = '78910';

      const initialCookieSubids = {
        [cookieSubid]: currentTimestamp,
      };
      const compressInitialCookieSubids = compress(initialCookieSubids);

      const subids = {
        ...initialCookieSubids,
        [querySubid]: currentTimestamp,
      };

      const compressSubids = compress(subids);

      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      Cookie.set(utils.getPrefixedCookieName(CONSTANTS.subid.name), compressInitialCookieSubids);
      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? querySubid : null));

      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.subids).toEqual(subids);
      expect(instance.cashbackSubids).toEqual({});
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(compressSubids);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(JSON.stringify(subids));
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('constructor - Should set subid from queryparams when consent optin, subid in localstorage and in queryparams', () => {
      const querySubid = '123456';
      const storageSubid = '78910';
      const initialStorageSubids = {
        [storageSubid]: currentTimestamp,
      };
      const compressInitialCookieSubids = compress(initialStorageSubids);

      const subids = {
        ...initialStorageSubids,
        [querySubid]: currentTimestamp,
      };

      const compressSubids = compress(subids);

      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      utils.Storage.save({ id: CONSTANTS.subid.name, value: compressInitialCookieSubids });
      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? querySubid : null));

      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.cashbackSubids).toEqual({});
      expect(instance.subids).toEqual(subids);
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(compressSubids);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(JSON.stringify(subids));
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
          const subids = {
            [subid]: currentTimestamp,
          };

          const compressSubids = compress(subids);

          Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

          const instance = new Sdk();

          expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
          expect(instance.subids).toEqual(subids);
          expect(instance.cashbackSubids).toEqual({});
          expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(compressSubids);
          expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(compressSubids);

          instance[methodName]();

          expect(instance.consent).toEqual(consentName);
          expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name))).toEqual(consentName);
          expect(utils.Storage.find(CONSTANTS.consent.name)?.value).toEqual(consentName);

          expect(instance.subids).toEqual(subids);
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
      const subids = {
        [subid]: currentTimestamp,
      };
      const compressSubids = compress(subids);
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
      expect(instance.subids).toEqual(subids);
      expect(instance.cashbackSubids).toEqual({});
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toBeFalsy();
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toBeFalsy();

      instance.push(['_setOptin']);
      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.consent.name))).toEqual(CONSTANTS.consent.status.optin);
      expect(utils.Storage.find(CONSTANTS.consent.name)?.value).toEqual(CONSTANTS.consent.status.optin);

      expect(instance.subids).toEqual(subids);
      expect(Cookie.get(utils.getPrefixedCookieName(CONSTANTS.subid.name))).toEqual(compressSubids);
      expect(utils.Storage.find(CONSTANTS.subid.name)?.value).toEqual(compressSubids);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(JSON.stringify(subids));

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
      const subids = {
        [subid]: currentTimestamp,
      };

      const errors = [];

      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.getTrace()).toEqual({
        env: 'test',
        progids,
        consent: CONSTANTS.consent.status.unknown,
        subids,
        cashbackSubids: {},
        event_consent_id: null,
        errors,
        conversionUrls,
      });

      expect(instance.subids).toEqual(subids);
      expect(instance.cashbackSubids).toEqual({});
      instance.push(['_setOptin']);

      instance.getProgramDataFromQueryParams = jest.fn(() => null);

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.subids).toEqual(subids);
      expect(instance.getTrace()).toEqual({
        env: 'test',
        progids,
        consent: CONSTANTS.consent.status.optin,
        subids,
        cashbackSubids: {},
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
        subids,
        cashbackSubids: {},
        event_consent_id: null,
        errors,
        conversionUrls,
      });
    });
  });

  describe('Retrocompatibility', () => {
    [
      { ...CONSTANTS.subid, key: 'subids' },
      { ...CONSTANTS.cashback, key: 'cashbackSubids' },
    ].forEach(({ name, key }) => {
      test(`Multisubids - Should convert old ${name} cookie format to the new one`, () => {
        const oldSubid =
          'eyJkIjoxNjY0NzkyNjYzLCJwaSI6IjIiLCJwIjoiNzkzMyIsInByIjoiMjM3MTg3In0.K3QnOea5TUph2WvxcpXEcqbuZ1XjceB1hq8GFar2cp12345';
        Cookie.set(utils.getPrefixedCookieName(name), oldSubid);

        utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);

        Sdk.getProgramDataFromQueryParams = jest.fn(() => null);

        expect(Cookie.get(utils.getPrefixedCookieName(name))).toEqual(oldSubid);
        expect(utils.getValue(name)).toEqual(oldSubid);

        const subids = {
          [oldSubid]: currentTimestamp,
        };

        const compressSubids = compress(subids);

        const instance = new Sdk();

        expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
        expect(Cookie.get(utils.getPrefixedCookieName(name))).toEqual(compressSubids);
        expect(utils.Storage.find(name)?.value).toEqual(compressSubids);
        expect(instance[key]).toEqual(subids);
        expect(fetch).toHaveBeenCalledTimes(0);
      });
    });

    [
      { ...CONSTANTS.subid, key: 'subids' },
      { ...CONSTANTS.cashback, key: 'cashbackSubids' },
    ].forEach(({ name, key }) => {
      test(`Multisubids - Should convert old ${name} storage format to the new one`, () => {
        const oldSubid =
          'eyJkIjoxNjY0NzkyNjYzLCJwaSI6IjIiLCJwIjoiNzkzMyIsInByIjoiMjM3MTg3In0.K3QnOea5TUph2WvxcpXEcqbuZ1XjceB1hq8GFar2cp';
        utils.Storage.save({ id: name, value: oldSubid });
        utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);

        Sdk.getProgramDataFromQueryParams = jest.fn(() => null);

        expect(utils.Storage.find(name)?.value).toEqual(oldSubid);
        expect(utils.getValue(name)).toEqual(oldSubid);

        const subids = {
          [oldSubid]: currentTimestamp,
        };

        const compressSubids = compress(subids);

        const instance = new Sdk();

        expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
        expect(utils.Storage.find(name)?.value).toEqual(compressSubids);
        expect(utils.Storage.find(name)?.value).toEqual(compressSubids);
        expect(instance[key]).toEqual(subids);
        expect(fetch).toHaveBeenCalledTimes(0);
      });
    });
  });
});
