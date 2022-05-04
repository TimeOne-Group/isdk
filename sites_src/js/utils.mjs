import Cookies from 'js-cookie';
import * as helpers from '../../src/utils.mjs';
import CONSTANTS from '../../src/constants.mjs';

const { sdkName } = CONSTANTS;

function objectToString(object = {}) {
  return JSON.stringify(object, Object.getOwnPropertyNames(object), '\t')
    .replace(/\n/g, '<br>')
    .replace(/\t/g, '&nbsp;&nbsp;&nbsp;');
}

const showTraceDebug = () => {
  if (!document.getElementById('debug-trace')) {
    setTimeout(() => showTraceDebug(), 300);
  } else {
    const traceState = window[sdkName]?.getTrace?.();

    document.getElementById('debug-trace').innerHTML = objectToString(traceState);
  }
};

const showLocalstorageDebug = () => {
  if (!document.getElementById('debug-localstorage')) {
    setTimeout(() => showLocalstorageDebug(), 300);
  } else {
    const storageState = {
      to_consent: helpers.Storage.find(CONSTANTS.consent.name)?.value,
      to_subid: helpers.Storage.find(CONSTANTS.subid.name)?.value,
    };

    document.getElementById('debug-localstorage').innerHTML = objectToString(storageState);
  }
};

const showCookieDebug = () => {
  if (!document.getElementById('debug-cookie')) {
    setTimeout(() => showCookieDebug(), 300);
  } else {
    const cookieState = {
      cmp_cookie: Cookies.get('klaro'),
      to_consent: Cookies.get(helpers.getPrefixedCookieName(CONSTANTS.consent.name)),
      to_subid: Cookies.get(helpers.getPrefixedCookieName(CONSTANTS.subid.name)),
    };

    document.getElementById('debug-cookie').innerHTML = objectToString(cookieState);
  }
};

export const showDebug = (callback) => {
  if (!document.getElementById('debug')) {
    setTimeout(() => showDebug(callback), 300);
  } else {
    const state = {
      progid: window[sdkName]?.progid,
      consent: window[sdkName]?.consent,
      subid: window[sdkName]?.subid,
    };

    document.getElementById('debug').innerHTML = objectToString(state);

    callback?.();
  }
};

export const showDebugTestsite = () => {
  showDebug(() => {
    showCookieDebug();
    showLocalstorageDebug();
    showTraceDebug();
  });
};

// export function checkDeferedSdk(path) {
//   function injectSdkAssets() {
//     function onload() {
//       showDebugTestsite();
//       console.log('SDK loaded');
//     }

//     // eslint-disable-next-line no-underscore-dangle
//     window.__ISDK_injectSdkAssets(path, onload);
//   }

//   const queryParams = new URLSearchParams(window.location.search);
//   const deferSdkAssets = queryParams.get('deferSdkAssets');

//   if (!deferSdkAssets) {
//     injectSdkAssets();
//   }

//   window.injectSdkAssets = injectSdkAssets;
// }
