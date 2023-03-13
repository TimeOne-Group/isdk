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

const testName = 'should_clean_old_cookie_when_define';
const url = TEST_CONSTANTS.baseUrl;
const cookieWildcardUrl = `${TEST_CONSTANTS.cookieWildcardBaseUrl}`;

export default async function shouldSetSdkToUnknownState(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(url);

  try {
    const initialConsent = await getSdkState(driver, 'consent');

    expect(initialConsent).toEqual(CONSTANTS.consent.status.unknown);

    await setOptin(driver);

    const consent = await getSdkState(driver, 'consent');

    expect(consent).toEqual(CONSTANTS.consent.status.optin);

    await driver.get(cookieWildcardUrl);

    const consentOnSubDomain = await getSdkState(driver, 'consent');

    expect(consentOnSubDomain).toEqual(CONSTANTS.consent.status.unknown);

    await browserstackLogSuccess(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Check old cookies are clean when sdk setup cookie wildcard`
    );
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Cookie consent has not the expected value ${CONSTANTS.consent.status.unknown}`
    );
  }
}
