/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'expect';

import {
  browserstackLogSuccess,
  browserstackLogError,
  getSdkState,
  setOptin,
  printTestInConsole,
} from '../../utils.mjs';
import CONSTANTS from '../../../src/constants.mjs';
import TEST_CONSTANTS from './constants.mjs';

const testName = 'should_share_cookie_between_domain_and_subdomain_when_define';
const url = `${TEST_CONSTANTS.cookieWildcardBaseUrl}`;
const subDomainUrl = `${TEST_CONSTANTS.cookieWildcardBaseSubDomainUrl}`;

export default async function shouldSetSdkToUnknownState(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(url);

  try {
    const initialConsent = await getSdkState(driver, 'consent');

    expect(initialConsent).toEqual(CONSTANTS.consent.status.unknown);

    await setOptin(driver);

    const consent = await getSdkState(driver, 'consent');

    expect(consent).toEqual(CONSTANTS.consent.status.optin);

    await driver.get(subDomainUrl);

    const consentOnSubDomain = await getSdkState(driver, 'consent');

    expect(consentOnSubDomain).toEqual(CONSTANTS.consent.status.optin);

    await browserstackLogSuccess(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Check cookie is shared between domain and subdomain when sdk setup cookie wildcard`
    );
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - cookie consent value is not equal to ${CONSTANTS.consent.status.optin} and not shared`
    );
  }
}
