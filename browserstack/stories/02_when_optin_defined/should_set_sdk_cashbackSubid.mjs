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

const testName = 'should_set_sdk_cashbackSubid';

export default async function shouldSetSdkCashbackSubid(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(TEST_CONSTANTS.baseUrl);

  try {
    const initialConsent = await getSdkState(driver, 'consent');
    const initialprogid = await getSdkState(driver, 'progid');
    const initialSubid = await getSdkState(driver, 'subid');
    const initialCashbackSubid = await getSdkState(driver, 'cashbackSubid');

    expect(initialConsent).toEqual(CONSTANTS.consent.status.unknown);
    expect(initialprogid).toBeFalsy();
    expect(initialSubid).toBeFalsy();
    expect(initialCashbackSubid).toBeFalsy();

    await setOptin(driver);

    await driver.get(`${TEST_CONSTANTS.baseUrl}?${CONSTANTS.cashback.queryname}=${TEST_CONSTANTS.cashbackSubid}`);
    const consent = await getSdkState(driver, 'consent');
    const subid = await getSdkState(driver, 'subid');
    const cashbackSubid = await getSdkState(driver, 'cashbackSubid');

    expect(consent).toEqual(CONSTANTS.consent.status.optin);
    expect(subid).toBeFalsy();
    expect(cashbackSubid).toEqual(TEST_CONSTANTS.cashbackSubid);

    await browserstackLogSuccess(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Check cashbackSubid value to be equal to ${TEST_CONSTANTS.cashbackSubid}`
    );
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - cashbackSubid value is not equal to ${TEST_CONSTANTS.cashbackSubid}`
    );
  }
}
