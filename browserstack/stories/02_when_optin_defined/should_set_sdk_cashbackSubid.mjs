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
const expectedCashbackSubids = expect.objectContaining({
  [TEST_CONSTANTS.cashbackSubid]: expect.any(Number),
});

export default async function shouldSetSdkCashbackSubid(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(TEST_CONSTANTS.baseUrl);

  try {
    const initialConsent = await getSdkState(driver, 'consent');
    const initialprogid = await getSdkState(driver, 'progid');
    const initialSubids = await getSdkState(driver, 'consentSubids');
    const initialCashbackSubids = await getSdkState(driver, 'cashbackSubids');

    expect(initialConsent).toEqual(CONSTANTS.consent.status.unknown);
    expect(initialprogid).toBeFalsy();
    expect(initialSubids).toEqual({});
    expect(initialCashbackSubids).toEqual({});

    await setOptin(driver);

    await driver.get(`${TEST_CONSTANTS.baseUrl}?${CONSTANTS.cashback.queryname}=${TEST_CONSTANTS.cashbackSubid}`);
    const consent = await getSdkState(driver, 'consent');
    const consentSubids = await getSdkState(driver, 'consentSubids');
    const cashbackSubids = await getSdkState(driver, 'cashbackSubids');

    expect(consent).toEqual(CONSTANTS.consent.status.optin);
    expect(consentSubids).toEqual({});
    expect(cashbackSubids).toEqual(expectedCashbackSubids);

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
