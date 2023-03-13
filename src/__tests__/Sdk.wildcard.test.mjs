/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-unresolved
import { expect } from 'expect';

import Sdk from '../Sdk.mjs';
import * as utils from '../utils.mjs';
import CONSTANTS from '../constants.mjs';

const progids = [109];

describe('The ISDK class test', () => {
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

  describe('Cookie  wildcard state', () => {
    [
      { value: 'true', expectedStatus: true },
      { value: 'false', expectedStatus: false },
      { value: undefined, expectedStatus: false },
    ].forEach(({ value, expectedStatus }) => {
      test(`constructor - Should${
        expectedStatus ? ' ' : ' not '
      }set cookie wildcard when attribute "data-wildcard-domain" is "${value}"`, () => {
        document.getElementById = jest.fn(() => ({
          getAttribute: (name) => {
            switch (name) {
              case 'data-progids':
                return JSON.stringify(progids);
              case 'data-wildcard-domain':
                return value;
              default:
                return undefined;
            }
          },
        }));

        const instance = new Sdk();

        expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
        expect(instance.getTrace()).toEqual(
          expect.objectContaining({
            useWildcardCookieDomain: expectedStatus,
          })
        );
      });

      test(`constructor - Should${
        expectedStatus ? ' ' : ' not '
      }set cookie wildcard when when global var window.__ISDK_wildcard_domain is "${value}"`, () => {
        // eslint-disable-next-line no-underscore-dangle
        global.__ISDK_wildcard_domain = value;

        const instance = new Sdk();

        expect(instance.consent).toEqual(CONSTANTS.consent.status.unknown);
        expect(instance.getTrace()).toEqual(
          expect.objectContaining({
            useWildcardCookieDomain: expectedStatus,
          })
        );
      });
    });
  });
});
