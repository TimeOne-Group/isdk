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

const testName = 'should_set_subid_from_queryparams_first';
const expectedSubids = expect.objectContaining({
  [TEST_CONSTANTS.subid]: expect.any(Number),
});

export default async function shouldSetSubidFromQueryparamsFirst(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(`${TEST_CONSTANTS.baseUrl}?${CONSTANTS.subid.queryname}=${TEST_CONSTANTS.subid}`);

  try {
    const initialConsent = await getSdkState(driver, 'consent');
    const initialprogid = await getSdkState(driver, 'progid');
    const initialSubids = await getSdkState(driver, 'consentSubids');

    expect(initialConsent).toEqual(CONSTANTS.consent.status.unknown);
    expect(initialprogid).toBeFalsy();
    expect(initialSubids).toEqual(expectedSubids);

    await setOptin(driver);

    const consent = await getSdkState(driver, 'consent');
    const consentSubids = await getSdkState(driver, 'consentSubids');

    expect(consent).toEqual(CONSTANTS.consent.status.optin);
    expect(consentSubids).toEqual(expectedSubids);

    const newSubid = 'newSubidValue';

    await driver.get(`${TEST_CONSTANTS.baseUrl}?${CONSTANTS.subid.queryname}=${newSubid}`);

    const subidFromNewUrl = await getSdkState(driver, 'consentSubids');

    expect(subidFromNewUrl).toEqual(
      expect.objectContaining({
        [newSubid]: expect.any(Number),
        [TEST_CONSTANTS.subid]: expect.any(Number),
      })
    );

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
