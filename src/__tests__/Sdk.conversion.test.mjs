/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-unresolved
import { expect } from 'expect';

import Sdk from '../Sdk.mjs';
import * as utils from '../utils.mjs';
import CONSTANTS from '../constants.mjs';

const progids = [109];
const event_consent_id = '993be906-9074-499a-aeb6-5af4e627aa06';
const minimumConvertPayload = {
  progid: progids[0],
  comid: 123,
  iu: 456,
};

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
  describe('Conversions', () => {
    conversionMethods.forEach((method) => {
      test(`method ${method} - Should not do a conversion when consent is not set and subid not defined`, () => {
        Sdk.getProgramDataFromQueryParams = jest.fn(() => null);

        const instance = new Sdk();

        instance.push([method, minimumConvertPayload]);
        expect(fetch).not.toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], expect.anything());
      });

      test(`method ${method} - Should do a conversion when consent is not set but subid defined in queryparams`, () => {
        const subid = 'subid_123456';

        Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

        const instance = new Sdk();

        instance.push([method, minimumConvertPayload]);
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
          expect(fetch).not.toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], expect.anything());
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
            expect(fetch).not.toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], expect.anything());
          });
        });

        test(`method ${method} - Should do a conversion when consent is ${consentName} but subid defined in queryparams`, () => {
          const subid = 'subid_123456';

          Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

          const instance = new Sdk();

          instance.push([consentMethodName]);
          instance.push([method, minimumConvertPayload]);

          expect(instance.consent).toEqual(consentName);
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
          expect(fetch).not.toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], expect.anything());
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
          expect(fetch).not.toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], expect.anything());
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
          expect(fetch).not.toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], expect.anything());
        });
      });

      test(`method ${method} - Should call first conversion url with right params when consent is optin`, () => {
        const subid = 'subid_123456';

        Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

        const instance = new Sdk();
        instance.push(['_setOptin']);
        instance.push([method, minimumConvertPayload]);

        expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({
            ...minimumConvertPayload,
            event_consent_id,
            toSubids: [{ type: 'consent', value: subid }],
          }),
        });
      });

      test(`method ${method} - Should call next conversion url with right params when consent is optin and first convension failed to resolve`, (done) => {
        const subid = 'subid_123456';
        const error = 'NetworError';

        fetch.mockResponse((req) => {
          if (req.url === CONSTANTS.urls.conversion[0]) {
            throw new Error(error);
          }
          return { ok: 'ok' };
        });

        Sdk.getProgramDataFromQueryParams = jest.fn((name) => (name === CONSTANTS.subid.queryname ? subid : null));

        const instance = new Sdk();

        instance.push(['_setOptin']);
        instance.push([method, minimumConvertPayload]);

        expect(instance.consent).toEqual(CONSTANTS.consent.status.optin);
        expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', accept: 'application/json' },
          body: JSON.stringify({
            ...minimumConvertPayload,
            event_consent_id,
            toSubids: [{ type: 'consent', value: subid }],
          }),
        });

        process.nextTick(() => {
          try {
            expect(fetch).toHaveBeenCalledWith(CONSTANTS.urls.conversion[1], {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', accept: 'application/json' },
              body: JSON.stringify({
                ...minimumConvertPayload,
                event_consent_id,
                toSubids: [{ type: 'consent', value: subid }],
              }),
            });
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
        expect(fetch).not.toHaveBeenCalledWith(CONSTANTS.urls.conversion[0], expect.anything());
      });
    });
  });
});
