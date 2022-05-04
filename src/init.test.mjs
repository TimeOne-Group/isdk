// import { Logger, AppError, Severity } from '@timeone-group/error-logger-js';
// import TogSdk, { SDK_NAME } from './TogSdk.mjs';

// export default function init(Sdk = TogSdk) {
//   try {
//     if (typeof window[SDK_NAME] === 'undefined') {
//       window[SDK_NAME] = new Sdk();
//     } else if (typeof window[SDK_NAME] === 'object' && Array.isArray(window[SDK_NAME])) {
//       const sdkTmp = Sdk();
//       window[SDK_NAME].forEach((args) => sdkTmp.push(args));
//       window[SDK_NAME] = sdkTmp;
//     } else if (typeof window[SDK_NAME] === 'object' && window[SDK_NAME] instanceof Sdk) {
//       // Nothing
//     } else {
//       throw new AppError(Severity.ERROR, 'Unknown type');
//     }
//   } catch (e) {
//     Logger.catchError(e, 'TOG - Tracker');
//   }
// }

// eslint-disable-next-line import/no-unresolved
// import init from './init';
import * as utils from './utils.mjs';
import CONSTANTS from './constants.mjs';

const name = 'foo';

beforeEach(() => {
  utils.removeValue(name);
});

test('getPrefixedCookieName - Should return prefixed name', () => {
  expect(`${CONSTANTS.default_storage_prefix}_${name}`).toEqual(utils.getPrefixedCookieName(name));
});
