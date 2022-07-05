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

export default async function shouldSetSdkToUnknownState(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(url);

  try {
    const initialConsent = await getSdkState(driver, 'consent');
    const initialprogid = await getSdkState(driver, 'progid');
    const initialSubid = await getSdkState(driver, 'subid');
    const initialCashbackSubid = await getSdkState(driver, 'cashbackSubid');

    expect(initialConsent).toEqual(CONSTANTS.consent.status.unknown);
    expect(initialprogid).toBeFalsy();
    expect(initialSubid).toEqual(TEST_CONSTANTS.subid);
    expect(initialCashbackSubid).toEqual(TEST_CONSTANTS.cashbackSubid);

    await setOptin(driver);

    const consent = await getSdkState(driver, 'consent');
    const subid = await getSdkState(driver, 'subid');
    const cashbackSubid = await getSdkState(driver, 'cashbackSubid');

    expect(consent).toEqual(CONSTANTS.consent.status.optin);
    expect(subid).toEqual(TEST_CONSTANTS.subid);
    expect(cashbackSubid).toEqual(TEST_CONSTANTS.cashbackSubid);

    await setUnknown(driver);

    const consentAfterClean = await getSdkState(driver, 'consent');
    const subidAfterClean = await getSdkState(driver, 'subid');
    const cashbackSubidAfterClean = await getSdkState(driver, 'cashbackSubid');

    expect(consentAfterClean).toEqual(CONSTANTS.consent.status.unknown);
    expect(subidAfterClean).toEqual(TEST_CONSTANTS.subid);
    expect(cashbackSubidAfterClean).toEqual(TEST_CONSTANTS.cashbackSubid);

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
