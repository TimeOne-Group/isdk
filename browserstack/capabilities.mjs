/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
import fetch from 'node-fetch';

const username = process.env.BROWSERSTACK_USERNAME;
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;

const buff = Buffer.from(`${username}:${accessKey}`);
const base64data = buff.toString('base64');

async function fetchCapabilities() {
  const response = await fetch(`https://api.browserstack.com/automate/browsers.json`, {
    headers: {
      Authorization: `Basic ${base64data}`,
    },
  });

  return response.json();
}

const build = 'Privacy by Design - javascript SDK';
const ios = [
  {
    device: 'iPhone XS',
    osVersion: [
      // 12,
      // 13, Not work with docker service name domain. Require localhost
      14, 15,
    ],
    browserName: 'iphone',
  },
];

const android = [
  {
    device: 'Samsung Galaxy S21',
    osVersion: ['11.0', '12.0'],
    browserName: 'android',
  },
  {
    device: 'Samsung Galaxy S20',
    osVersion: ['10.0'],
    browserName: 'android',
  },
];

const browserToIgnore = ['ie', 'opera'];
const browserVersions = ['latest', 'latest-1'];

const desktopOsVersion = {
  Windows: ['7', '11'],
  'OS X': ['Big Sur', 'Monterey'],
};

function getOs(capabilities) {
  const desktop = [...new Set(capabilities.filter(({ device }) => !device).map(({ os }) => os))];
  const mobile = [...new Set(capabilities.filter(({ device }) => !!device).map(({ os }) => os))];

  return { desktop, mobile };
}

function getBrowsers(capabilities, osName) {
  return [...new Set(capabilities.filter(({ os }) => os === osName).map(({ browser }) => browser))];
}

function builBrowserCapabilities({ allCapabilities, name, osList }) {
  const generatedBrowserCapabilities = osList?.flatMap((os) =>
    desktopOsVersion[os]?.flatMap((os_version) =>
      getBrowsers(allCapabilities, os)
        .filter((browser) => !browserToIgnore.includes(browser))
        .flatMap((browser) =>
          browserVersions.map((browser_version) => ({
            browser,
            browser_version,
            os,
            os_version,
            build,
            name,
          }))
        )
    )
  );

  return generatedBrowserCapabilities.filter(({ os, os_version, browser, browser_version }) => {
    const existingCapacities = allCapabilities.filter(
      (capability) => capability.os === os && capability.os_version === os_version && capability.browser === browser
    );

    switch (browser_version) {
      case 'latest-2':
        return existingCapacities.length > 2;
      case 'latest-1':
        return existingCapacities.length > 1;
      case 'latest':
        return existingCapacities.length > 0;

      default:
        return false;
    }
  });
}

function buildMobileCapabilities(mobileConfig, name) {
  return mobileConfig.flatMap(({ device, osVersion, browserName }) =>
    osVersion.map((os_version) => ({
      device,
      os_version,
      browserName,
      realMobile: 'true',
      build,
      name,
    }))
  );
}

export default async function getCapabilities(name) {
  if (process.env.DEV_BROWSERSTACK_TEST) {
    return [
      // {
      //   device: 'iPhone XS',
      //   os_version: 12, // 14
      //   browserName: 'iphone',
      //   realMobile: 'true',
      //   build: 'Development',
      //   name: 'DEV - Building browserstack tests',
      // },
      {
        browser: 'chrome',
        browser_version: 'latest',
        os: 'Windows',
        os_version: '10',
        build: 'Development',
        name: 'DEV - Building browserstack tests',
      },
    ];
  }

  const allCapabilities = await fetchCapabilities();
  const { desktop } = getOs(allCapabilities);

  const browserCapabilities = builBrowserCapabilities({ allCapabilities, name, osList: desktop });
  const iosCapabilities = buildMobileCapabilities(ios, name);
  const androidCapabilities = buildMobileCapabilities(android, name);

  return [...iosCapabilities, ...androidCapabilities, ...browserCapabilities];
}
