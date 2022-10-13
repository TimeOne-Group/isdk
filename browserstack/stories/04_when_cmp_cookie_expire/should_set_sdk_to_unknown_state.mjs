/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'expect';

import {
  browserstackLogSuccess,
  browserstackLogError,
  getSdkState,
  setOptin,
  setUnknown,
  printTestInConsole,
} from '../../utils.mjs';
import CONSTANTS from '../../../src/constants.mjs';
import TEST_CONSTANTS from './constants.mjs';

const testName = 'should_set_sdk_to_unknown_state';
const url = `${TEST_CONSTANTS.baseUrl}?${CONSTANTS.subid.queryname}=${TEST_CONSTANTS.subid}&${CONSTANTS.cashback.queryname}=${TEST_CONSTANTS.cashbackSubid}`;
const expectedSubids = expect.objectContaining({
  [TEST_CONSTANTS.subid]: expect.any(Number),
});
const expectedCashbackSubids = expect.objectContaining({
  [TEST_CONSTANTS.cashbackSubid]: expect.any(Number),
});

export default async function shouldSetSdkToUnknownState(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(url);

  try {
    const initialConsent = await getSdkState(driver, 'consent');
    const initialprogid = await getSdkState(driver, 'progid');
    const initialSubids = await getSdkState(driver, 'consentSubids');
    const initialCashbackSubids = await getSdkState(driver, 'cashbackSubids');

    expect(initialConsent).toEqual(CONSTANTS.consent.status.unknown);
    expect(initialprogid).toBeFalsy();
    expect(initialSubids).toEqual(expectedSubids);
    expect(initialCashbackSubids).toEqual(expectedCashbackSubids);

    await setOptin(driver);

    const consent = await getSdkState(driver, 'consent');
    const consentSubids = await getSdkState(driver, 'consentSubids');
    const cashbackSubids = await getSdkState(driver, 'cashbackSubids');

    expect(consent).toEqual(CONSTANTS.consent.status.optin);
    expect(consentSubids).toEqual(expectedSubids);
    expect(cashbackSubids).toEqual(expectedCashbackSubids);

    await setUnknown(driver);

    const consentAfterClean = await getSdkState(driver, 'consent');
    const subidAfterClean = await getSdkState(driver, 'consentSubids');
    const cashbackSubidAfterClean = await getSdkState(driver, 'cashbackSubids');

    expect(consentAfterClean).toEqual(CONSTANTS.consent.status.unknown);
    expect(subidAfterClean).toEqual(expectedSubids);
    expect(cashbackSubidAfterClean).toEqual(expectedCashbackSubids);

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
