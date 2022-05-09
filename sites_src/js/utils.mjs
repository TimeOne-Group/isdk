import Cookies from 'js-cookie';
import * as helpers from '../../src/utils.mjs';
import CONSTANTS from '../../src/constants.mjs';

const { sdkName } = CONSTANTS;

const showTraceDebug = () => {
  if (!document.getElementById('debug-trace')) {
    setTimeout(() => showTraceDebug(), 300);
  } else {
    const traceState = window[sdkName]?.getTrace?.();

    document.getElementById('debug-trace').innerHTML = JSON.stringify(traceState, null, '\t');
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

    document.getElementById('debug-localstorage').innerHTML = JSON.stringify(storageState, null, '\t');
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

    document.getElementById('debug-cookie').innerHTML = JSON.stringify(cookieState, null, '\t');
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

    document.getElementById('debug').innerHTML = JSON.stringify(state, null, '\t');
  }

  callback?.();
};

export const showDebugTestsite = () => {
  showDebug(() => {
    showCookieDebug();
    showLocalstorageDebug();
    showTraceDebug();
  });
};
