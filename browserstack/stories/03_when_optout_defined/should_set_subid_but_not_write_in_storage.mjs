/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'expect';

import {
  browserstackLogSuccess,
  browserstackLogError,
  getSdkState,
  setOptin,
  setOptout,
  setUnknown,
  printTestInConsole,
} from '../../utils.mjs';
import CONSTANTS from '../../../src/constants.mjs';
import TEST_CONSTANTS from './constants.mjs';

const testName = 'should_set_subid_but_not_write_in_storage';
const url = `${TEST_CONSTANTS.baseUrl}?${CONSTANTS.subid.queryname}=${TEST_CONSTANTS.subid}`;
const expectedSubids = expect.objectContaining({
  [TEST_CONSTANTS.subid]: expect.any(Number),
});

export default async function shouldNotSetSubid(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(url);

  try {
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

    await setUnknown(driver);

    const unknownConsent = await getSdkState(driver, 'consent');
    const subidAfterCleanCmp = await getSdkState(driver, 'subids');

    expect(unknownConsent).toEqual(CONSTANTS.consent.status.unknown);
    expect(subidAfterCleanCmp).toEqual(expectedSubids);

    await setOptout(driver);

    const optoutConsent = await getSdkState(driver, 'consent');
    const subidFromAfterSetOptout = await getSdkState(driver, 'subids');

    expect(optoutConsent).toEqual(CONSTANTS.consent.status.optout);
    expect(subidFromAfterSetOptout).toEqual(expectedSubids);

    await driver.get(url);

    const subidFromReloadAfterOptout = await getSdkState(driver, 'subids');

    expect(subidFromReloadAfterOptout).toEqual(expectedSubids);
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
