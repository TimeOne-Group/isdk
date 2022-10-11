/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'expect';

import { browserstackLogSuccess, browserstackLogError, getSdkState, printTestInConsole } from '../../utils.mjs';
import CONSTANTS from '../../../src/constants.mjs';
import TEST_CONSTANTS from './constants.mjs';

const testName = 'should_set_default_consent_to_unknown';

export default async function noConsentDefined(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(TEST_CONSTANTS.baseUrl);

  try {
    const consent = await getSdkState(driver, 'consent');
    const progid = await getSdkState(driver, 'progid');
    const subids = await getSdkState(driver, 'subids');

    expect(consent).toEqual(CONSTANTS.consent.status.unknown);
    expect(progid).toBeFalsy();
    expect(subids).toEqual({});

    await browserstackLogSuccess(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Check consent status to be equal to ${CONSTANTS.consent.status.unknown}`
    );
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Consent status is not equal to ${CONSTANTS.consent.status.unknown}`
    );
  }
}
