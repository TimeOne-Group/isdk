/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'expect';

import { browserstackLogSuccess, browserstackLogError, getSdkState, printTestInConsole } from '../../utils.mjs';
import CONSTANTS from '../../../src/constants.mjs';
import TEST_CONSTANTS from './constants.mjs';

const testName = 'should_keep_only_most_recent_cashback_when_progid_patched';
const url = `${TEST_CONSTANTS.subidLimitBaseUrl}`;

export default async function shouldKeepOnlyMostRecentCashbackWhenProgidPatched(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(`${url}?${CONSTANTS.cashback.queryname}=${TEST_CONSTANTS.cashbackSubid}`);

  try {
    const storedSubids = await getSdkState(driver, 'cashbackSubids');

    expect(storedSubids).toEqual({ [TEST_CONSTANTS.cashbackSubid]: expect.any(Number) });

    await driver.get(`${url}?${CONSTANTS.cashback.queryname}=${TEST_CONSTANTS.secondCashbackSubid}`);

    const cashbackSubids = await getSdkState(driver, 'cashbackSubids');

    expect(cashbackSubids).toEqual({ [TEST_CONSTANTS.secondCashbackSubid]: expect.any(Number) });

    await browserstackLogSuccess(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Check only the most recent cashback subid is kept when progid is patched`
    );
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - cashback subids are not limited to the most recent one when progid is patched`
    );
  }
}
