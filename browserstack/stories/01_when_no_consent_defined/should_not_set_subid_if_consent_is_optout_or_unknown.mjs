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

const testName = 'should_not_set_subid_if_consent_is_optout_or_unknown';
const url = `${TEST_CONSTANTS.baseUrl}?${CONSTANTS.subid.queryname}=${TEST_CONSTANTS.subid}`;

export default async function shouldNotSetSubidIfConsentIsOptoutOrUnknown(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(url);

  try {
    const initialConsent = await getSdkState(driver, 'consent');
    const initialprogid = await getSdkState(driver, 'progid');
    const initialSubid = await getSdkState(driver, 'subid');

    expect(initialConsent).toEqual(CONSTANTS.consent.status.unknown);
    expect(initialprogid).toBeFalsy();
    expect(initialSubid).toBeFalsy();

    await setOptout(driver);

    const consent = await getSdkState(driver, 'consent');
    const subid = await getSdkState(driver, 'subid');

    expect(consent).toEqual(CONSTANTS.consent.status.optout);
    expect(subid).toBeFalsy();

    await browserstackLogSuccess(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Check subid value is not set`
    );
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(driver, `${TEST_CONSTANTS.groupTestName} | ${testName} - subid value should not be set`);
  }
}
