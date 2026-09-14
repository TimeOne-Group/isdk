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

const testName = 'should_keep_only_most_recent_subid_when_global_limit_defined';
const url = `${TEST_CONSTANTS.subidLimitGlobalBaseUrl}`;

export default async function shouldKeepOnlyMostRecentSubidWhenGlobalLimitDefined(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(`${url}?${CONSTANTS.subid.queryname}=${TEST_CONSTANTS.subid}`);

  try {
    await setOptin(driver);

    const storedSubids = await getSdkState(driver, 'consentSubids');

    expect(storedSubids).toEqual({ [TEST_CONSTANTS.subid]: expect.any(Number) });

    await driver.get(`${url}?${CONSTANTS.subid.queryname}=${TEST_CONSTANTS.secondSubid}`);

    const consentSubids = await getSdkState(driver, 'consentSubids');

    expect(consentSubids).toEqual({ [TEST_CONSTANTS.secondSubid]: expect.any(Number) });

    await browserstackLogSuccess(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Check only the most recent subid is kept when __ISDK_subid_limit is defined`
    );
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - subids are not limited to the most recent one when __ISDK_subid_limit is defined`
    );
  }
}
