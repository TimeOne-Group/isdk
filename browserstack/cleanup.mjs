import { browserstackLogSuccess, browserstackLogError, setUnknown } from './utils.mjs';
// import CONSTANTS from '../src/constants.mjs';

export default async function cleanup(driver) {
  try {
    await driver.manage().deleteAllCookies();

    await driver.executeScript('return localStorage.clear();');

    await setUnknown(driver);

    await browserstackLogSuccess(driver, 'Cleanup');
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(driver, 'Failed to cleanup');
  }
}
