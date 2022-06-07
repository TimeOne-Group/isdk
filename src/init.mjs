import ISDK from './Sdk.mjs';
import CONSTANTS from './constants.mjs';

const { sdkName } = CONSTANTS;

export default function init(Sdk = ISDK) {
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
      throw new Error(`${sdkName} error: Unknown type`);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e.message);
  }
}
