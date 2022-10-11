// import webdriver from 'selenium-webdriver';
// eslint-disable-next-line import/no-extraneous-dependencies
import { By } from 'selenium-webdriver';
import CONSTANTS from '../src/constants.mjs';

const { sdkName } = CONSTANTS;
let testSuiteErrors = 0;
let totalErrors = 0;

export function getErrorCount() {
  return { testSuiteErrors, totalErrors };
}

export function resetTestSuiteError() {
  testSuiteErrors = 0;
}

export function setCookie(driver, { cookieName, value }) {
  return driver.executeScript(`return window.TOG_Cookies.set("${cookieName}", "${value}")`);
}

export function findCookie(driver, { cookieName }) {
  return driver.executeScript(`return window.TOG_Cookies.get("${cookieName}")`);
}

export function findStorage(driver, { name }) {
  return driver.executeScript(`return window.TOG_Storage.find("${name}")`);
}

export function clearStorage(driver, { name }) {
  return driver.executeScript(`return window.TOG_Storage.delete("${name}")`);
}

export function clickButtonByText(driver, buttonText) {
  return driver.findElement(By.xpath(`//button[normalize-space()="${buttonText}"]`)).click();
}

export function clickButtonById(driver, id) {
  return driver.findElement(By.id(id)).click();
}

export function setOptin(driver) {
  return clickButtonById(driver, 'SDKsetOptin');
}

export function setOptout(driver) {
  return clickButtonById(driver, 'SDKsetOptout');
}

export function setUnknown(driver) {
  return clickButtonById(driver, 'SDKsetUnknown');
}

export function injectSdk(driver) {
  return clickButtonById(driver, 'injectSdk');
}

export function browserstackLogSuccess(driver, message) {
  return driver.executeScript(
    `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "${message}"}}`
  );
}

export function browserstackLogError(driver, message) {
  testSuiteErrors += 1;
  totalErrors += 1;
  return driver.executeScript(
    `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${message}"}}`
  );
}

export function ciLogError(driver, message) {
  return driver.executeScript(
    `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "${message}"}}`
  );
}

export async function getSdkState(driver, key) {
  const response = await driver.executeScript(`return window.${sdkName}${key ? `.${key}` : ''}`);

  if (response === Object(response)) {
    delete response.sessionId;
    delete response.capabilities;
  }

  return response;
}

export function callSdkMethod(driver, { methodName, params }) {
  return driver.executeScript(`return window.${sdkName}.push(["${methodName}", ${JSON.stringify(params)}])`);
}

export function wait(driver, time = 5000) {
  console.log(`Start waiting for ${time}ms`);
  return driver.wait(
    () =>
      new Promise((resolve) => {
        setTimeout(() => {
          console.log('End wait');
          resolve(true);
        }, time);
      })
  );
}

export function printTestInConsole(testGroupName, testName) {
  console.log(`${testGroupName} - ${testName}`);
}
