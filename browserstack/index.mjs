/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import webdriver from 'selenium-webdriver';
import browserstack from 'browserstack-local';

import getCapabilities from './capabilities.mjs';

import { getErrorCount, resetTestSuiteError, ciLogError } from './utils.mjs';
import cleanup from './cleanup.mjs';
import {
  shouldSetDefaultConsentToUnknown,
  shouldSetConsentToOptin,
  shouldSetConsentToOptout,
  shouldSetSubidIfConsentIsOptin,
  shouldNotSetSubidIfConsentIsOptoutOrUnknown,
  shouldSetSubidFromQueryparamsFirst,
  shouldSetSubidFromStorage,
  shouldNotSetSubid,
  shouldSetSdkToUnknownState,
} from './stories/index.mjs';

const bsLocal = new browserstack.Local();
const bsLocalOptions = { key: process.env.BROWSERSTACK_ACCESS_KEY };

function printCapabilities({ device, os, os_version, browserName, browser, browser_version } = {}) {
  const printOs = device ? `Mobile ${device} ${os_version}` : `Desktop ${os} ${os_version}`;
  const printBrowser = device ? browserName : `${browser} ${browser_version}`;
  console.log('--------------------------------------');
  console.log(`${printOs} - ${printBrowser}`);
  console.log('--------------------------------------');
}

function getErrorMessage(nbErrors) {
  if (nbErrors > 1) {
    return `${nbErrors} tests have failed`;
  }

  return `${nbErrors} test has failed`;
}

function cleanupBeforeNextTestSuite(driver, tests) {
  return tests.reduce(async (testsPromisify, test, index) => {
    if (index === 0) {
      return testsPromisify.then(() => test(driver));
    }

    return testsPromisify.then(() => cleanup(driver)).then(() => test(driver));
  }, Promise.resolve());
}

async function runTestWithCaps(capabilities) {
  printCapabilities(capabilities);

  const driver = new webdriver.Builder()
    .usingServer('http://hub.browserstack.com/wd/hub')
    .withCapabilities({
      ...capabilities,
      'browserstack.debug': true,
      'browserstack.networkLogs': true,
      'browserstack.console': 'errors',
      'browserstack.user': process.env.BROWSERSTACK_USERNAME,
      'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY,
      'browserstack.local': true,
      ...(capabilities.browser && { browserName: capabilities.browser }), // Because NodeJS language binding requires browserName to be defined
    })
    .build();

  await cleanupBeforeNextTestSuite(driver, [
    shouldSetDefaultConsentToUnknown,
    shouldSetConsentToOptin,
    shouldSetConsentToOptout,
    shouldSetSubidIfConsentIsOptin,
    shouldNotSetSubidIfConsentIsOptoutOrUnknown,
    shouldSetSubidFromQueryparamsFirst,
    shouldSetSubidFromStorage,
    shouldNotSetSubid,
    shouldSetSdkToUnknownState,
  ]);

  const { testSuiteErrors } = getErrorCount();

  if (testSuiteErrors > 0) {
    // To mark browserstack test as failed
    await ciLogError(driver, getErrorMessage(testSuiteErrors));
  }

  resetTestSuiteError();
  await driver.quit();
}

bsLocal.start(bsLocalOptions, async () => {
  console.log('Started BrowserStackLocal');
  console.log('BrowserStackLocal running:', bsLocal.isRunning());

  if (bsLocal.isRunning()) {
    const capabilities = await getCapabilities('Browser assets build');

    await capabilities.reduce(
      (previousPromise, capability) => previousPromise.then(() => runTestWithCaps(capability)),
      Promise.resolve()
    );
  }

  bsLocal.stop(() => {
    console.log('--------------------------------------');
    console.log('Stopped BrowserStackLocal');

    const { totalErrors } = getErrorCount();

    if (totalErrors > 0) {
      // To make the CI fail on error
      throw new Error(getErrorMessage(totalErrors));
    }
  });
});
