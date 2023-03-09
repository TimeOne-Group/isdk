import { browserstackLogSuccess, browserstackLogError, setUnknown } from './utils.mjs';
import CONSTANTS from './constants.mjs';

async function cleanupByUrl(driver, url) {
  await driver.get(url);
  await driver.manage().deleteAllCookies();

  await driver.executeScript('return localStorage.clear();');

  await setUnknown(driver);

  await browserstackLogSuccess(driver, `Cleanup ${url}`);
}

export default async function cleanup(driver) {
  try {
    await cleanupByUrl(driver, CONSTANTS.baseUrl);
    await cleanupByUrl(driver, CONSTANTS.baseSubDomainUrl);
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(driver, 'Failed to cleanup');
  }
}
