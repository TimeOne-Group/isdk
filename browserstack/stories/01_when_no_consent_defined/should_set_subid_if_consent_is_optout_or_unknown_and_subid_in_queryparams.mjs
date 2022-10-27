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

const testName = 'should_set_subid_if_consent_is_optout_or_unknown_and_subid_in_queryparams';
const url = `${TEST_CONSTANTS.baseUrl}?${CONSTANTS.subid.queryname}=${TEST_CONSTANTS.subid}`;

export default async function shouldNotSetSubidIfConsentIsOptoutOrUnknown(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(url);

  try {
    const initialConsent = await getSdkState(driver, 'consent');
    const initialprogid = await getSdkState(driver, 'progid');
    const initialSubids = await getSdkState(driver, 'consentSubids');

    expect(initialConsent).toEqual(CONSTANTS.consent.status.unknown);
    expect(initialprogid).toBeFalsy();
    expect(initialSubids).toEqual(
      expect.objectContaining({
        [TEST_CONSTANTS.subid]: expect.any(Number),
      })
    );

    await setOptout(driver);

    const consent = await getSdkState(driver, 'consent');
    const consentSubids = await getSdkState(driver, 'consentSubids');

    expect(consent).toEqual(CONSTANTS.consent.status.optout);
    expect(consentSubids).toEqual(
      expect.objectContaining({
        [TEST_CONSTANTS.subid]: expect.any(Number),
      })
    );

    await browserstackLogSuccess(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Check subid value is not set`
    );
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(driver, `${TEST_CONSTANTS.groupTestName} | ${testName} - subid value should not be set`);
  }
}
