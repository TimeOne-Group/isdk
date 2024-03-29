/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-unresolved
import { expect } from 'expect';
import Cookie from 'js-cookie';
import LZString from 'lz-string';

import Sdk from '../Sdk.mjs';
import * as utils from '../utils.mjs';
import CONSTANTS from '../constants.mjs';

const progid = 109;
const progids = [progid];
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

const apiDeleteOptions = {
  ...apiOptions,
  method: 'DELETE',
};

const visitDefaultPayload = {
  type: CONSTANTS.stats.type.visit,
  progid: progids[0],
  url: 'localhost/',
};

const hitDefaultPayload = {
  progid: progids[0],
  type: CONSTANTS.stats.type.hit,
  url: 'localhost/',
  get event_timestamp() {
    return utils.getHitTimestamp();
  },
  count: '1',
};

const defaultTrace = {
  env: 'test',
  useWildcardCookieDomain: false,
};

const consentStorageName = utils.getPrefixedStorageName(CONSTANTS.consent.name);
const consentSubidStorageName = utils.getPrefixedStorageName(CONSTANTS.subid.name);
const noConsentMethods = [
  { methodName: '_setUnknown', consentName: CONSTANTS.consent.status.unknown },
  { methodName: '_setOptout', consentName: CONSTANTS.consent.status.optout },
];

function formatAndCompress(value) {
  const formattedValue = JSON.stringify({ createAt: currentTimestamp, value });

  return LZString.compressToBase64(formattedValue);
}

function getConsentValueForStorage(value) {
  return JSON.stringify({ createAt: currentTimestamp, value });
}

describe('The ISDK class test', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    // We keep a very big date, 2200, because we do not want our cookie ttl expires for test
    jest.setSystemTime(new Date(2200, 9, 1));

    currentTimestamp = utils.getCurrentTimestamp();
  });

  beforeEach(() => {
    // eslint-disable-next-line no-underscore-dangle
    global.__ISDK_wildcard_domain = undefined;
    Sdk.getProgramDataFromQueryParams = jest.fn();
    fetch.resetMocks();
    document.getElementById = jest.fn(() => ({
      getAttribute: (name) => {
        switch (name) {
          case 'data-progids':
            return JSON.stringify(progids);
          default:
            return undefined;
        }
      },
    }));
    utils.removeValue(CONSTANTS.subid.name);
    utils.removeValue(CONSTANTS.cashback.name);
    utils.removeValue(CONSTANTS.consent.name);
  });

  describe('Consent', () => {
    test('constructor - Should set default values', () => {
      expect(Cookie.get(consentStorageName)).toBeFalsy();
      expect(utils.Storage.find(consentStorageName)).toBeFalsy();

      expect(Cookie.get(consentSubidStorageName)).toBeFalsy();
      expect(utils.Storage.find(consentSubidStorageName)).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.consentSubids).toEqual({});
      expect(fetch).toHaveBeenCalledTimes(3);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...visitDefaultPayload,
          status: CONSTANTS.consent.status.unknown,
          toSubids: [],
        }),
      });
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.deleteData[0], {
        ...apiDeleteOptions,
        body: JSON.stringify({
          progid,
        }),
      });
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...hitDefaultPayload,
          status: CONSTANTS.consent.status.unknown,
          toSubids: [],
        }),
      });
    });

    test('constructor - Should set consent from cookie', () => {
      const consent = CONSTANTS.consent.status.optout;

      Cookie.set(consentStorageName, getConsentValueForStorage(consent));
      expect(utils.Storage.find(consentStorageName)).toBeFalsy();

      expect(Cookie.get(consentSubidStorageName));
      expect(utils.Storage.find(consentSubidStorageName)).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(consent);
      expect(instance.consentSubids).toEqual({});
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.deleteData[0], {
        ...apiDeleteOptions,
        body: JSON.stringify({
          progid,
        }),
      });
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...hitDefaultPayload,
          status: CONSTANTS.consent.status.optout,
          toSubids: [],
        }),
      });
    });

    test('constructor - Should set consent from localstorage', () => {
      const consent = CONSTANTS.consent.status.optout;

      utils.Storage.save({
        id: consentStorageName,
        value: getConsentValueForStorage(consent),
      });

      expect(Cookie.get(consentStorageName)).toBeFalsy();

      expect(Cookie.get(consentSubidStorageName)).toBeFalsy();
      expect(utils.Storage.find(consentSubidStorageName)).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(consent);
      expect(instance.consentSubids).toEqual({});
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.deleteData[0], {
        ...apiDeleteOptions,
        body: JSON.stringify({
          progid,
        }),
      });
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...hitDefaultPayload,
          status: CONSTANTS.consent.status.optout,
          toSubids: [],
        }),
      });
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
      expect(instance.consentSubids).toEqual({});
      expect(instance.cashbackSubids).toEqual(cashbackSubids);
      expect(fetch).toHaveBeenCalledTimes(4);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...visitDefaultPayload,
          status: CONSTANTS.consent.status.unknown,
          toSubids: [cashbackSubid],
        }),
      });
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.deleteData[0], {
        ...apiDeleteOptions,
        body: JSON.stringify({
          progid,
        }),
      });
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.events[0], {
        ...apiOptions,
        body: JSON.stringify({
          type: CONSTANTS.events.visit_promethee,
          toSubids: [
            {
              type: CONSTANTS.cashback.payloadType,
              value: cashbackSubid,
            },
          ],
        }),
      });
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...hitDefaultPayload,
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
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(7);
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
        expect(instance.consentSubids).toEqual({});
        expect(fetch).toHaveBeenCalledTimes(2);
        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.deleteData[0], {
          ...apiDeleteOptions,
          body: JSON.stringify({
            progid,
          }),
        });
        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
          ...apiOptions,
          body: JSON.stringify({
            ...hitDefaultPayload,
            status: consent,
            toSubids: [],
          }),
        });
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
        expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(7);
        expect(instance.consentSubids).toEqual(subids);
        expect(fetch).toHaveBeenCalledTimes(3);
        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.deleteData[0], {
          ...apiDeleteOptions,
          body: JSON.stringify({
            progid,
          }),
        });
        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.events[0], {
          ...apiOptions,
          body: JSON.stringify({
            type: CONSTANTS.events.visit_promethee,
            toSubids: [
              {
                type: CONSTANTS.subid.payloadType,
                value: subid,
              },
            ],
          }),
        });
        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
          ...apiOptions,
          body: JSON.stringify({
            ...hitDefaultPayload,
            status: consent,
            toSubids: [subid],
          }),
        });
      });
    });

    test('constructor - Should remove subid from storage when no consent', () => {
      const subid = 'subid_123';
      const subids = {
        [subid]: currentTimestamp,
      };

      const compressSubids = formatAndCompress(subids);

      utils.setValue(subids, CONSTANTS.subid.name);

      expect(Cookie.get(consentSubidStorageName)).toEqual(compressSubids);
      expect(utils.Storage.find(consentSubidStorageName)).toEqual(compressSubids);

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.consentSubids).toEqual({});
      expect(Cookie.get(consentSubidStorageName)).toBeFalsy();
      expect(utils.Storage.find(consentSubidStorageName)).toBeFalsy();
    });

    noConsentValues.forEach((consent) => {
      test(`constructor - Should remove subid from storage when consent stored is ${consent}`, () => {
        const subid = 'subid_123';
        const subids = {
          [subid]: currentTimestamp,
        };

        const compressSubids = formatAndCompress(subids);

        utils.setValue(subids, CONSTANTS.subid.name);

        expect(Cookie.get(consentSubidStorageName)).toEqual(compressSubids);
        expect(utils.Storage.find(consentSubidStorageName)).toEqual(compressSubids);

        utils.setValue(consent, CONSTANTS.consent.name);

        expect(Cookie.get(consentStorageName)).toEqual(getConsentValueForStorage(consent));
        expect(utils.Storage.find(consentStorageName)).toEqual(getConsentValueForStorage(consent));

        const instance = new Sdk();

        expect(instance.consent).toEqual(consent);
        expect(instance.consentSubids).toEqual({});
        expect(Cookie.get(consentSubidStorageName)).toBeFalsy();
        expect(utils.Storage.find(consentSubidStorageName)).toBeFalsy();
      });
    });

    test('constructor - Should no set subid when consent optin but no subid queryparams or storage', () => {
      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      Sdk.getProgramDataFromQueryParams = jest.fn(() => null);

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(8);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(Cookie.get(consentSubidStorageName)).toEqual('');
      expect(utils.Storage.find(consentSubidStorageName)).toEqual(null);
      expect(instance.consentSubids).toEqual({});
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...hitDefaultPayload,
          status: CONSTANTS.consent.status.optin,
          toSubids: [],
        }),
      });
    });

    test('constructor - Should set subid when consent optin and queryparams subid', () => {
      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);

      const subid = 'subid_123456';
      const subids = {
        [subid]: currentTimestamp,
      };

      const compressSubids = formatAndCompress(subids);

      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(8);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.consentSubids).toEqual(subids);
      expect(Cookie.get(consentSubidStorageName)).toEqual(compressSubids);
      expect(utils.Storage.find(consentSubidStorageName)).toEqual(compressSubids);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(subids);
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.events[0], {
        ...apiOptions,
        body: JSON.stringify({
          type: CONSTANTS.events.visit_promethee,
          toSubids: [
            {
              type: CONSTANTS.subid.payloadType,
              value: subid,
            },
          ],
        }),
      });
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...hitDefaultPayload,
          status: CONSTANTS.consent.status.optin,
          toSubids: [subid],
        }),
      });
    });

    test('constructor - Should set subid when consent optin and subid in cookie', () => {
      const subid = 'subid_1234567';
      const subids = {
        [subid]: currentTimestamp,
      };

      const compressSubids = formatAndCompress(subids);

      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      Cookie.set(consentSubidStorageName, compressSubids);
      Sdk.getProgramDataFromQueryParams = jest.fn(() => null);

      expect(utils.Storage.find(consentSubidStorageName)).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(8);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.consentSubids).toEqual(subids);
      expect(Cookie.get(consentSubidStorageName)).toEqual(compressSubids);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(subids);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...hitDefaultPayload,
          status: CONSTANTS.consent.status.optin,
          toSubids: [],
        }),
      });
    });

    test('constructor - Should set subid when consent optin and subid in localstorage', () => {
      const subid = 'subid_12345678';
      const subids = {
        [subid]: currentTimestamp,
      };

      const compressSubids = formatAndCompress(subids);

      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      utils.Storage.save({ id: consentSubidStorageName, value: compressSubids });
      Sdk.getProgramDataFromQueryParams = jest.fn(() => null);

      expect(Cookie.get(consentSubidStorageName)).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(8);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.consentSubids).toEqual(subids);
      expect(instance.cashbackSubids).toEqual({});
      expect(utils.Storage.find(consentSubidStorageName)).toEqual(compressSubids);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(subids);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...hitDefaultPayload,
          status: CONSTANTS.consent.status.optin,
          toSubids: [],
        }),
      });
    });

    test('constructor - Should set subid from queryparams when consent optin, subid in cookie and in queryparams', () => {
      const querySubid = '123456';
      const cookieSubid = '78910';

      const initialCookieSubids = {
        [cookieSubid]: currentTimestamp,
      };
      const compressInitialCookieSubids = formatAndCompress(initialCookieSubids);

      const subids = {
        ...initialCookieSubids,
        [querySubid]: currentTimestamp,
      };

      const compressSubids = formatAndCompress(subids);

      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      Cookie.set(consentSubidStorageName, compressInitialCookieSubids);
      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? querySubid : null));

      expect(utils.Storage.find(consentSubidStorageName)).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(8);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.consentSubids).toEqual(subids);
      expect(instance.cashbackSubids).toEqual({});
      expect(Cookie.get(consentSubidStorageName)).toEqual(compressSubids);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(subids);
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.events[0], {
        ...apiOptions,
        body: JSON.stringify({
          type: CONSTANTS.events.visit_promethee,
          toSubids: [
            {
              type: CONSTANTS.subid.payloadType,
              value: querySubid,
            },
          ],
        }),
      });
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...hitDefaultPayload,
          status: CONSTANTS.consent.status.optin,
          toSubids: [querySubid],
        }),
      });
    });

    test('constructor - Should set subid from queryparams when consent optin, subid in localstorage and in queryparams', () => {
      const querySubid = '123456';
      const storageSubid = '78910';
      const initialStorageSubids = {
        [storageSubid]: currentTimestamp,
      };
      const compressInitialCookieSubids = formatAndCompress(initialStorageSubids);

      const subids = {
        ...initialStorageSubids,
        [querySubid]: currentTimestamp,
      };

      const compressSubids = formatAndCompress(subids);

      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
      utils.Storage.save({ id: consentSubidStorageName, value: compressInitialCookieSubids });
      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? querySubid : null));

      expect(Cookie.get(consentSubidStorageName)).toBeFalsy();

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(8);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
      expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
      expect(instance.cashbackSubids).toEqual({});
      expect(instance.consentSubids).toEqual(subids);
      expect(utils.Storage.find(consentSubidStorageName)).toEqual(compressSubids);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(subids);
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.events[0], {
        ...apiOptions,
        body: JSON.stringify({
          type: CONSTANTS.events.visit_promethee,
          toSubids: [
            {
              type: CONSTANTS.subid.payloadType,
              value: querySubid,
            },
          ],
        }),
      });
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...hitDefaultPayload,
          status: CONSTANTS.consent.status.optin,
          toSubids: [querySubid],
        }),
      });
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
        // expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
          ...apiOptions,
          body: JSON.stringify({
            ...visitDefaultPayload,
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

          const compressSubids = formatAndCompress(subids);

          Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

          const instance = new Sdk();

          expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
          expect(instance.consentSubids).toEqual(subids);
          expect(instance.cashbackSubids).toEqual({});
          expect(Cookie.get(consentSubidStorageName)).toEqual(compressSubids);
          expect(utils.Storage.find(consentSubidStorageName)).toEqual(compressSubids);

          expect(fetch).toHaveBeenCalledTimes(2);
          expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.events[0], {
            ...apiOptions,
            body: JSON.stringify({
              type: CONSTANTS.events.visit_promethee,
              toSubids: [
                {
                  type: CONSTANTS.subid.payloadType,
                  value: subid,
                },
              ],
            }),
          });
          expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
            ...apiOptions,
            body: JSON.stringify({
              ...hitDefaultPayload,
              status: CONSTANTS.consent.status.optin,
              toSubids: [subid],
            }),
          });

          fetch.resetMocks();

          instance[methodName]();

          expect(instance.consent).toEqual(consentName);
          expect(Cookie.get(consentStorageName)).toEqual(getConsentValueForStorage(consentName));
          expect(utils.Storage.find(consentStorageName)).toEqual(getConsentValueForStorage(consentName));

          expect(instance.consentSubids).toEqual(subids);
          expect(Cookie.get(consentSubidStorageName)).toBeFalsy();
          expect(utils.Storage.find(consentSubidStorageName)).toBeFalsy();
          expect(utils.getValue(CONSTANTS.subid.name)).toBeFalsy();

          expect(fetch).toHaveBeenCalledTimes(4);
          expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
            ...apiOptions,
            body: JSON.stringify({
              ...visitDefaultPayload,
              status: consentName,
              toSubids: [subid],
            }),
          });
          expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.deleteData[0], {
            ...apiDeleteOptions,
            body: JSON.stringify({
              progid,
            }),
          });
          expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
            ...apiOptions,
            body: JSON.stringify({
              ...hitDefaultPayload,
              count: '-1',
              status: CONSTANTS.consent.status.optin,
              toSubids: [subid],
            }),
          });
          expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
            ...apiOptions,
            body: JSON.stringify({
              ...hitDefaultPayload,
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
      const consent = CONSTANTS.consent.status.optin;
      const compressSubids = formatAndCompress(subids);
      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

      const instance = new Sdk();
      expect(fetch).toHaveBeenCalledTimes(4);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...visitDefaultPayload,
          status: CONSTANTS.consent.status.unknown,
          toSubids: [subid],
        }),
      });
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.deleteData[0], {
        ...apiDeleteOptions,
        body: JSON.stringify({
          progid,
        }),
      });

      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.events[0], {
        ...apiOptions,
        body: JSON.stringify({
          type: CONSTANTS.events.visit_promethee,
          toSubids: [
            {
              type: CONSTANTS.subid.payloadType,
              value: subid,
            },
          ],
        }),
      });

      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...hitDefaultPayload,
          status: CONSTANTS.consent.status.unknown,
          toSubids: [subid],
        }),
      });

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.consentSubids).toEqual(subids);
      expect(instance.cashbackSubids).toEqual({});
      expect(Cookie.get(consentSubidStorageName)).toBeFalsy();
      expect(utils.Storage.find(consentSubidStorageName)).toBeFalsy();

      instance.push(['_setOptin']);
      expect(instance.consent).toEqual(consent);
      expect(Cookie.get(consentStorageName)).toEqual(getConsentValueForStorage(consent));
      expect(utils.Storage.find(consentStorageName)).toEqual(getConsentValueForStorage(consent));

      expect(instance.consentSubids).toEqual(subids);
      expect(Cookie.get(consentSubidStorageName)).toEqual(compressSubids);
      expect(utils.Storage.find(consentSubidStorageName)).toEqual(compressSubids);
      expect(utils.getValue(CONSTANTS.subid.name)).toEqual(subids);

      expect(fetch).toHaveBeenCalledTimes(9);
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...visitDefaultPayload,
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
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.registerIpFingerprint[0], {
        ...apiOptions,
        body: JSON.stringify({
          progid,
          event_consent_id: instance.eventConsentId,
          toSubids: [{ type: CONSTANTS.subid.payloadType, value: subid }],
        }),
      });
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...hitDefaultPayload,
          status: CONSTANTS.consent.status.unknown,
          count: '-1',
          toSubids: [subid],
        }),
      });
      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.stats[0], {
        ...apiOptions,
        body: JSON.stringify({
          ...hitDefaultPayload,
          status: CONSTANTS.consent.status.optin,
          toSubids: [subid],
        }),
      });
    });

    test('method getTrace - Should store a trace when consent change', () => {
      const subid = 'subid_123456789';
      const consentSubids = {
        [subid]: currentTimestamp,
      };

      const errors = [];

      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

      const instance = new Sdk();

      expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
      expect(instance.getTrace()).toEqual({
        ...defaultTrace,
        progids,
        consent: CONSTANTS.consent.status.unknown,
        consentSubids,
        cashbackSubids: {},
        errors,
        conversionUrls,
      });

      expect(instance.consentSubids).toEqual(consentSubids);
      expect(instance.cashbackSubids).toEqual({});
      instance.push(['_setOptin']);

      instance.getProgramDataFromQueryParams = jest.fn(() => null);

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
      expect(instance.consentSubids).toEqual(consentSubids);
      expect(instance.getTrace()).toEqual({
        ...defaultTrace,
        progids,
        consent: CONSTANTS.consent.status.optin,
        consentSubids,
        cashbackSubids: {},
        event_consent_id,
        errors,
        conversionUrls,
      });

      instance.push(['_setOptout']);

      expect(instance.consent).toEqual(CONSTANTS.consent.status.optout);
      expect(instance.getTrace()).toEqual({
        ...defaultTrace,
        progids,
        consent: CONSTANTS.consent.status.optout,
        consentSubids,
        cashbackSubids: {},
        errors,
        conversionUrls,
      });
    });

    ['_setOptin', '_setUnknown', '_setOptout'].forEach((methodName) => {
      test(`method registerIpFingerprint - Should not call registerIpFingerprint api if no subid or cashbackSubid is defined when ${methodName}`, () => {
        const instance = new Sdk();
        instance[methodName]();

        expect(fetch).not.toHaveBeenCalledWith(CONSTANTS.urls.registerIpFingerprint[0], expect.any(Object));
      });

      test(`method registerIpFingerprint - Should call registerIpFingerprint api if cashbackSubid is defined when ${methodName}`, () => {
        const cashbackSubid = 'cashback_12345';

        Sdk.getProgramDataFromQueryParams = jest.fn((name) =>
          name === CONSTANTS.cashback.queryname ? cashbackSubid : null
        );

        const instance = new Sdk();
        instance[methodName]();

        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.registerIpFingerprint[0], {
          ...apiOptions,
          body: JSON.stringify({
            progid,
            toSubids: [{ type: CONSTANTS.cashback.payloadType, value: cashbackSubid }],
          }),
        });
      });
    });

    test(`method registerIpFingerprint - Should call registerIpFingerprint api if subid is defined and consent optin`, () => {
      const subid = '12345';

      Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

      const instance = new Sdk();
      instance.push(['_setOptin']);

      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.registerIpFingerprint[0], {
        ...apiOptions,
        body: JSON.stringify({
          progid,
          event_consent_id: instance.eventConsentId,
          toSubids: [{ type: CONSTANTS.subid.payloadType, value: subid }],
        }),
      });
    });

    test(`method registerIpFingerprint - Should call registerIpFingerprint api if subid and cashbackSubid are defined and consent optin`, () => {
      const subid = '12345';
      const cashbackSubid = 'cashback_12345';

      Sdk.getProgramDataFromQueryParams = jest.fn((name) =>
        name === CONSTANTS.subid.queryname ? subid : cashbackSubid
      );

      const instance = new Sdk();
      instance.push(['_setOptin']);

      expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.registerIpFingerprint[0], {
        ...apiOptions,
        body: JSON.stringify({
          progid,
          event_consent_id: instance.eventConsentId,
          toSubids: [
            { type: CONSTANTS.subid.payloadType, value: subid },
            { type: CONSTANTS.cashback.payloadType, value: cashbackSubid },
          ],
        }),
      });
    });

    noConsentMethods.forEach(({ methodName, consentName }) => {
      test(`method registerIpFingerprint - Should not call registerIpFingerprint api if subid defined and consent ${consentName}`, () => {
        const subid = '12345';

        Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

        const instance = new Sdk();
        instance[methodName]();

        expect(fetch).not.toHaveBeenCalledWith(CONSTANTS.urls.registerIpFingerprint[0], expect.any(Object));
      });
    });
  });

  describe('Retrocompatibility', () => {
    expect(true).toBeTruthy();

    // TODO: Désactivé entre la v1 et la v2. Pourra être réactivé pour les versions suivantes
    // [
    //   { ...CONSTANTS.subid, key: 'consentSubids' },
    //   { ...CONSTANTS.cashback, key: 'cashbackSubids' },
    // ].forEach(({ name, key }) => {
    // test(`Multisubids - Should convert old ${name} storage format to the new one`, () => {
    //   const oldSubid =
    //     'eyJkIjoxNjY0NzkyNjYzLCJwaSI6IjIiLCJwIjoiNzkzMyIsInByIjoiMjM3MTg3In0.K3QnOea5TUph2WvxcpXEcqbuZ1XjceB1hq8GFar2cp';
    //   utils.Storage.save({ id: utils.getPrefixedStorageName(name, sufixV1), value: oldSubid });
    //   utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);
    //   Sdk.getProgramDataFromQueryParams = jest.fn(() => null);
    //   expect(utils.Storage.find(utils.getPrefixedStorageName(name, sufixV1))).toEqual(oldSubid);
    //   expect(utils.getValue(name, sufixV1)).toEqual(oldSubid);
    //   const subids = {
    //     [oldSubid]: currentTimestamp,
    //   };
    //   const compressSubids = formatAndCompress(subids);
    //   const instance = new Sdk();
    //   expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
    //   expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledTimes(2);
    //   expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.subid.queryname);
    //   expect(instance.constructor.getProgramDataFromQueryParams).toHaveBeenCalledWith(CONSTANTS.cashback.queryname);
    //   expect(Cookie.get(utils.getPrefixedStorageName(name))).toEqual(compressSubids);
    //   expect(utils.Storage.find(utils.getPrefixedStorageName(name))).toEqual(compressSubids);
    //   expect(instance[key]).toEqual(subids);
    //   expect(fetch).toHaveBeenCalledTimes(0);
    // });
    // });
  });
});
