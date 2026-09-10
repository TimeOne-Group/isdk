/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
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
const patchedLimits = { [progid]: { subid: 1, cashback: 1 } };

const NOW = utils.getCurrentTimestamp();
const subidOldest = { subid_oldest: NOW - 30000 };
const subidMiddle = { subid_middle: NOW - 20000 };
const subidNewest = { subid_newest: NOW - 10000 };

function compress(value) {
  return LZString.compressToBase64(JSON.stringify({ createAt: NOW, value }));
}

function setStoredSubids(name, value) {
  Cookie.set(utils.getPrefixedStorageName(name), compress(value));
}

function readStoredSubids(name) {
  const rawValue = Cookie.get(utils.getPrefixedStorageName(name));

  return JSON.parse(LZString.decompressFromBase64(rawValue))?.value;
}

describe('The ISDK class test', () => {
  beforeEach(() => {
    CONSTANTS.subid_limits_by_progid = {};
    global.__ISDK_subid_limit = undefined;
    global.__ISDK_cashback_limit = undefined;
    Sdk.getProgramDataFromQueryParams = jest.fn(() => null);
    fetch.resetMocks();
    document.getElementById = jest.fn(() => ({
      getAttribute: (name) => (name === 'data-progids' ? JSON.stringify(progids) : undefined),
    }));
    utils.removeValue(CONSTANTS.subid.name);
    utils.removeValue(CONSTANTS.cashback.name);
    utils.removeValue(CONSTANTS.consent.name);
    utils.removeValue(CONSTANTS.event_consent_id.name);
  });

  describe('Subid limits', () => {
    [CONSTANTS.subid, CONSTANTS.cashback].forEach(({ name }) => {
      test(`constructor - Should keep multiple ${name} subids when no limit is defined`, () => {
        const storedSubids = { ...subidOldest, ...subidNewest };
        setStoredSubids(name, storedSubids);
        utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);

        const instance = new Sdk();

        const subids = name === CONSTANTS.subid.name ? instance.consentSubids : instance.cashbackSubids;

        expect(subids).toEqual(storedSubids);
      });
    });

    test('constructor - Should keep only the most recent subid when progid is patched', () => {
      CONSTANTS.subid_limits_by_progid = patchedLimits;
      setStoredSubids(CONSTANTS.subid.name, { ...subidOldest, ...subidNewest });
      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);

      const instance = new Sdk();

      expect(instance.consentSubids).toEqual(subidNewest);
    });

    test('constructor - Should keep only the most recent cashback subid when progid is patched', () => {
      CONSTANTS.subid_limits_by_progid = patchedLimits;
      setStoredSubids(CONSTANTS.cashback.name, { ...subidOldest, ...subidNewest });

      const instance = new Sdk();

      expect(instance.cashbackSubids).toEqual(subidNewest);
    });

    test('constructor - Should not limit subids when progid is not listed', () => {
      CONSTANTS.subid_limits_by_progid = { 999: { subid: 1, cashback: 1 } };
      const storedSubids = { ...subidOldest, ...subidNewest };
      setStoredSubids(CONSTANTS.subid.name, storedSubids);
      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);

      const instance = new Sdk();

      expect(instance.consentSubids).toEqual(storedSubids);
    });

    test('constructor - Should apply limit when any declared progid is patched', () => {
      document.getElementById = jest.fn(() => ({
        getAttribute: (name) => (name === 'data-progids' ? JSON.stringify([109, 456]) : undefined),
      }));
      CONSTANTS.subid_limits_by_progid = { 456: { subid: 1 } };
      setStoredSubids(CONSTANTS.subid.name, { ...subidOldest, ...subidNewest });
      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);

      const instance = new Sdk();

      expect(instance.consentSubids).toEqual(subidNewest);
    });

    test('constructor - Should prefer __ISDK_subid_limit over progid patch', () => {
      CONSTANTS.subid_limits_by_progid = patchedLimits;
      global.__ISDK_subid_limit = 2;
      setStoredSubids(CONSTANTS.subid.name, { ...subidOldest, ...subidMiddle, ...subidNewest });
      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);

      const instance = new Sdk();

      expect(instance.consentSubids).toEqual({ ...subidMiddle, ...subidNewest });
    });

    test('constructor - Should apply __ISDK_subid_limit when progid is not patched', () => {
      global.__ISDK_subid_limit = 1;
      setStoredSubids(CONSTANTS.subid.name, { ...subidOldest, ...subidNewest });
      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);

      const instance = new Sdk();

      expect(instance.consentSubids).toEqual(subidNewest);
    });

    test('constructor - Should rewrite the stored cookie with the limited subids', () => {
      CONSTANTS.subid_limits_by_progid = patchedLimits;
      setStoredSubids(CONSTANTS.subid.name, { ...subidOldest, ...subidMiddle, ...subidNewest });
      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);

      // eslint-disable-next-line no-new
      new Sdk();

      expect(readStoredSubids(CONSTANTS.subid.name)).toEqual(subidNewest);
    });

    test('constructor - Should keep the queryparams subid when it is the most recent', () => {
      CONSTANTS.subid_limits_by_progid = patchedLimits;
      setStoredSubids(CONSTANTS.subid.name, subidOldest);
      Sdk.getProgramDataFromQueryParams = jest.fn((name) =>
        name === CONSTANTS.subid.queryname ? 'subid_queryparams' : null
      );
      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);

      const instance = new Sdk();

      expect(Object.keys(instance.consentSubids)).toEqual(['subid_queryparams']);
    });

    ['abc', 0, -1].forEach((invalidLimit) => {
      test(`constructor - Should not limit subids when __ISDK_subid_limit is "${invalidLimit}"`, () => {
        global.__ISDK_subid_limit = invalidLimit;
        const storedSubids = { ...subidOldest, ...subidNewest };
        setStoredSubids(CONSTANTS.subid.name, storedSubids);
        utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);

        const instance = new Sdk();

        expect(instance.consentSubids).toEqual(storedSubids);
      });
    });

    test('constructor - Should fall back to progid patch when __ISDK_subid_limit is invalid', () => {
      CONSTANTS.subid_limits_by_progid = patchedLimits;
      global.__ISDK_subid_limit = 'abc';
      setStoredSubids(CONSTANTS.subid.name, { ...subidOldest, ...subidNewest });
      utils.setValue(CONSTANTS.consent.status.optin, CONSTANTS.consent.name);

      const instance = new Sdk();

      expect(instance.consentSubids).toEqual(subidNewest);
    });

    test('constructor - Should apply __ISDK_cashback_limit when progid is not patched', () => {
      global.__ISDK_cashback_limit = 1;
      setStoredSubids(CONSTANTS.cashback.name, { ...subidOldest, ...subidNewest });

      const instance = new Sdk();

      expect(instance.cashbackSubids).toEqual(subidNewest);
    });

    test('constructor - Should rewrite the stored cashback cookie with the limited subids', () => {
      CONSTANTS.subid_limits_by_progid = patchedLimits;
      setStoredSubids(CONSTANTS.cashback.name, { ...subidOldest, ...subidMiddle, ...subidNewest });

      // eslint-disable-next-line no-new
      new Sdk();

      expect(readStoredSubids(CONSTANTS.cashback.name)).toEqual(subidNewest);
    });

    test('getTrace - Should expose the resolved subid limits', () => {
      CONSTANTS.subid_limits_by_progid = patchedLimits;

      const instance = new Sdk();

      expect(instance.getTrace()).toEqual(expect.objectContaining({ subidLimits: { subid: 1, cashback: 1 } }));
    });
  });
});
