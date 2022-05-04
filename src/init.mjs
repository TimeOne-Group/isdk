import { Logger, AppError, Severity } from '@timeone-group/error-logger-js';
import TogSdk from './TogSdk.mjs';
import CONSTANTS from './constants.mjs';

const { sdkName } = CONSTANTS;

export default function init(Sdk = TogSdk) {
  try {
    if (typeof window[sdkName] === 'undefined') {
      window[sdkName] = new Sdk();
    } else if (typeof window[sdkName] === 'object' && Array.isArray(window[sdkName])) {
      const sdkTmp = new Sdk();
      window[sdkName].forEach((args) => sdkTmp.push(args));
      window[sdkName] = sdkTmp;
    } else if (typeof window[sdkName] === 'object' && window[sdkName] instanceof Sdk) {
      // Nothing
    } else {
      throw new AppError(Severity.ERROR, 'Unknown type');
    }
  } catch (e) {
    Logger.catchError(e, 'TOG - Tracker');
  }
}
