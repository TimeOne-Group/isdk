import { browserstackLogSuccess, browserstackLogError, clearStorage, setUnknown } from './utils.mjs';
import CONSTANTS from '../src/constants.mjs';

export default async function cleanup(driver) {
  try {
    await driver.manage().deleteAllCookies();
    await clearStorage(driver, { name: CONSTANTS.consent.name });
    await clearStorage(driver, { name: CONSTANTS.subid.name });
    await clearStorage(driver, { name: CONSTANTS.cashback.name });
    await setUnknown(driver);

    await browserstackLogSuccess(driver, 'Cleanup');
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(driver, 'Failed to cleanup');
  }
}
