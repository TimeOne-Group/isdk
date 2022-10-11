/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'expect';

import {
  browserstackLogSuccess,
  browserstackLogError,
  getSdkState,
  setOptin,
  printTestInConsole,
  setCookie,
  findCookie,
} from '../../utils.mjs';
import CONSTANTS from '../../../src/constants.mjs';
import TEST_CONSTANTS from './constants.mjs';

const testName = 'should_set_subid_if_consent_is_optin_from_old_storage_value';
const oldSubidFormat = 'Old3R.sUb1d.F0rma7';
const expectedSubids = expect.objectContaining({
  [oldSubidFormat]: expect.any(Number),
});
const cookieName = `to_${CONSTANTS.subid.name}`;

export default async function shouldSetSubidifConsentIsOptinFromOldStorageValue(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);
  try {
    await driver.get(`${TEST_CONSTANTS.baseUrl}`);

    await setCookie(driver, { cookieName, value: oldSubidFormat });
    const subidFromCookie = await findCookie(driver, { cookieName });

    expect(subidFromCookie).toEqual(oldSubidFormat);

    const initialConsent = await getSdkState(driver, 'consent');
    const initialprogid = await getSdkState(driver, 'progid');
    const initialSubids = await getSdkState(driver, 'subids');

    expect(initialConsent).toEqual(CONSTANTS.consent.status.unknown);
    expect(initialprogid).toBeFalsy();
    expect(initialSubids).toEqual(expectedSubids);

    await setOptin(driver);

    const consent = await getSdkState(driver, 'consent');
    const subids = await getSdkState(driver, 'subids');

    expect(consent).toEqual(CONSTANTS.consent.status.optin);
    expect(subids).toEqual(expectedSubids);

    await browserstackLogSuccess(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Check subid value to be equal to ${TEST_CONSTANTS.subid}`
    );
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - subid value is not equal to ${TEST_CONSTANTS.subid}`
    );
  }
}
