/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'expect';

import {
  browserstackLogSuccess,
  browserstackLogError,
  getSdkState,
  setOptout,
  printTestInConsole,
} from '../../utils.mjs';
import CONSTANTS from '../../../src/constants.mjs';
import TEST_CONSTANTS from './constants.mjs';

const testName = 'should_set_consent_to_optout';

export default async function shouldSetConsentToOptout(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(TEST_CONSTANTS.baseUrl);

  try {
    const initialConsent = await getSdkState(driver, 'consent');
    const initialprogid = await getSdkState(driver, 'progid');
    const initialSubids = await getSdkState(driver, 'subids');

    expect(initialConsent).toEqual(CONSTANTS.consent.status.unknown);
    expect(initialprogid).toBeFalsy();
    expect(initialSubids).toEqual({});

    await setOptout(driver);

    const consent = await getSdkState(driver, 'consent');

    expect(consent).toEqual(CONSTANTS.consent.status.optout);
    await browserstackLogSuccess(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Check consent status to be equal to ${CONSTANTS.consent.status.optout}`
    );
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Consent status is not equal to ${CONSTANTS.consent.status.optout}`
    );
  }
}
