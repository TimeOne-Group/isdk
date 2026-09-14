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

const testName = 'should_keep_multiple_subids_when_no_limit_defined';
const url = `${TEST_CONSTANTS.baseUrl}`;

export default async function shouldKeepMultipleSubidsWhenNoLimitDefined(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(`${url}?${CONSTANTS.subid.queryname}=${TEST_CONSTANTS.subid}`);

  try {
    await setOptin(driver);

    await driver.get(`${url}?${CONSTANTS.subid.queryname}=${TEST_CONSTANTS.secondSubid}`);

    const consentSubids = await getSdkState(driver, 'consentSubids');

    expect(consentSubids).toEqual({
      [TEST_CONSTANTS.subid]: expect.any(Number),
      [TEST_CONSTANTS.secondSubid]: expect.any(Number),
    });

    await browserstackLogSuccess(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Check multiple subids are kept when no limit is defined`
    );
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - subids should not be limited when no limit is defined`
    );
  }
}
