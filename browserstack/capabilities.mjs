/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable camelcase */
import fetch from 'node-fetch';

const username = process.env.BROWSERSTACK_USERNAME;
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;

const buff = Buffer.from(`${username}:${accessKey}`);
const base64data = buff.toString('base64');

export async function fetchCapabilities() {
  const response = await fetch(`https://api.browserstack.com/automate/browsers.json`, {
    headers: {
      Authorization: `Basic ${base64data}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch browserstack capabilities: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

const build = 'Privacy by Design - javascript SDK';
// Les devices iOS < 14 ne résolvent pas le nom de domaine docker (localhost requis)
const ios = [
  {
    device: 'iPhone 15',
    osVersion: ['17'],
    browserName: 'iphone',
  },
  {
    device: 'iPhone 16',
    osVersion: ['18'],
    browserName: 'iphone',
  },
];

const android = [
  {
    device: 'Samsung Galaxy S23 Ultra',
    osVersion: ['13.0'],
    browserName: 'android',
  },
  {
    device: 'Samsung Galaxy S24',
    osVersion: ['14.0'],
    browserName: 'android',
  },
];

const browserToIgnore = ['ie', 'opera', 'chromeForTesting'];
const browserVersions = ['latest', 'latest-1'];

const desktopOsVersion = {
  Windows: ['10', '11'],
  'OS X': ['Sonoma', 'Sequoia'],
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

// Un device retiré du catalogue BrowserStack est ignoré avec un warning
// plutôt que de faire échouer la session (ex: iPhone XS retiré en 2026)
function filterAvailableMobileCapabilities(mobileCapabilities, allCapabilities) {
  return mobileCapabilities.filter(({ device, os_version }) => {
    const isAvailable = allCapabilities.some(
      (capability) => capability.device === device && capability.os_version === String(os_version)
    );

    if (!isAvailable) {
      console.warn(`BrowserStack device not available, skipped: ${device} (os ${os_version})`);
    }

    return isAvailable;
  });
}

export default async function getCapabilities(name) {
  if (process.env.DEV_BROWSERSTACK_TEST) {
    return [
      // {
      //   device: 'iPhone 16',
      //   os_version: '18',
      //   browserName: 'iphone',
      //   realMobile: 'true',
      //   build: 'Development',
      //   name: 'DEV - Building browserstack tests',
      // },
      {
        device: 'Samsung Galaxy S24',
        os_version: '14.0',
        browserName: 'android',
        realMobile: 'true',
        build: 'Development',
        name: 'DEV - Building browserstack tests',
      },
      // {
      //   browser: 'chrome',
      //   browser_version: 'latest',
      //   os: 'Windows',
      //   os_version: '11',
      //   build: 'Development',
      //   name: 'DEV - Building browserstack tests',
      // },
    ];
  }

  const allCapabilities = await fetchCapabilities();
  const { desktop } = getOs(allCapabilities);

  const browserCapabilities = builBrowserCapabilities({ allCapabilities, name, osList: desktop });
  const mobileCapabilities = buildMobileCapabilities([...ios, ...android], name);
  const availableMobileCapabilities = filterAvailableMobileCapabilities(mobileCapabilities, allCapabilities);

  return [...availableMobileCapabilities, ...browserCapabilities];
}
