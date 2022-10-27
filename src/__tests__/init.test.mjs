/* eslint-disable no-console */
import init from '../init.mjs';
import Sdk from '../Sdk.mjs';

import CONSTANTS from '../constants.mjs';

const { sdk_name: sdkName } = CONSTANTS;

describe('The init function', () => {
  test(`Should set global var window.${sdkName} when not defined`, () => {
    expect(window[sdkName]).not.toBeDefined();

    init();

    expect(window[sdkName]).toBeInstanceOf(Sdk);
  });

  test(`Should print an error if window.${sdkName} already defined but not instance of Sdk or Array`, () => {
    const badValue = 'broken';
    window[sdkName] = badValue;

    console.error = jest.fn();
    init();

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(window[sdkName]).toEqual(badValue);
  });

  test(`Should replace global var window.${sdkName} when instance of Array`, () => {
    window[sdkName] = [];
    expect(window[sdkName]).toBeInstanceOf(Array);

    init();

    expect(window[sdkName]).not.toBeInstanceOf(Array);
    expect(window[sdkName]).toBeInstanceOf(Sdk);
  });

  test(`Should replace global var window.${sdkName} when instance of Array and replay all action`, () => {
    window[sdkName] = [['_setOptin']];
    expect(window[sdkName]).toBeInstanceOf(Array);

    init();

    expect(window[sdkName]).not.toBeInstanceOf(Array);
    expect(window[sdkName]).toBeInstanceOf(Sdk);
    expect(window[sdkName].consent).toEqual(CONSTANTS.consent.status.optin);
  });

  test(`Should do nothing when global var window.${sdkName} already Sdk instance`, () => {
    const instance = new Sdk();
    const instance2 = new Sdk();

    window[sdkName] = instance;
    window[sdkName].push([['_setOptin']]);

    expect(window[sdkName]).toBeInstanceOf(Sdk);
    expect(window[sdkName].consent).toEqual(CONSTANTS.consent.status.optin);

    init();

    expect(window[sdkName]).toBeInstanceOf(Sdk);
    expect(window[sdkName] === instance).toBeTruthy();
    expect(window[sdkName] === instance2).toBeFalsy();
    expect(window[sdkName].consent).toEqual(CONSTANTS.consent.status.optin);
  });
});
