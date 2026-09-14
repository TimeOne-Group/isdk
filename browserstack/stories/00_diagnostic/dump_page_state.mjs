/* eslint-disable import/no-extraneous-dependencies */
import { browserstackLogSuccess, browserstackLogError, printTestInConsole } from '../../utils.mjs';
import TEST_CONSTANTS from './constants.mjs';

const testName = 'dump_page_state';

// Story de diagnostic temporaire : dump l'état réel de la page vue par le device.
// A retirer une fois le problème de chargement sur real devices résolu.
export default async function dumpPageState(driver) {
  printTestInConsole(TEST_CONSTANTS.groupTestName, testName);

  await driver.get(TEST_CONSTANTS.baseUrl);

  try {
    const state = await driver.executeScript(`return {
      url: window.location.href,
      title: document.title,
      readyState: document.readyState,
      sdkType: typeof window.__ISDK,
      hasSdkScript: !!document.getElementById('__ISDK_ASSETS'),
      hasOptinButton: !!document.getElementById('SDKsetOptin'),
      resources: performance.getEntriesByType('resource').map((entry) => entry.name),
      bodySnippet: document.body ? document.body.innerText.substring(0, 300) : null,
    }`);

    console.log('DIAGNOSTIC PAGE STATE:', JSON.stringify(state, null, 2));

    await browserstackLogSuccess(driver, `${TEST_CONSTANTS.groupTestName} | ${testName} - diagnostic logged`);
  } catch (e) {
    console.error(e.message);
    await browserstackLogError(driver, `${TEST_CONSTANTS.groupTestName} | ${testName} - failed to dump page state`);
  }
}
