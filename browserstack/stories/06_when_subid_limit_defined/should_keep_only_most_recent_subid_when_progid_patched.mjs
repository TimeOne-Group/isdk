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

const testName = 'should_keep_only_most_recent_subid_when_progid_patched';
const url = `${TEST_CONSTANTS.subidLimitBaseUrl}`;

export default async function shouldKeepOnlyMostRecentSubidWhenProgidPatched(driver) {
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
      `${TEST_CONSTANTS.groupTestName} | ${testName} - Check only the most recent subid is kept when progid is patched`
    );
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(
      driver,
      `${TEST_CONSTANTS.groupTestName} | ${testName} - subids are not limited to the most recent one when progid is patched`
    );
  }
}
