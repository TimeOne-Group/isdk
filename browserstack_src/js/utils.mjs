import Cookies from 'js-cookie';
import * as utils from '../../src/utils.mjs';
import CONSTANTS from '../../src/constants.mjs';

const { sdkName } = CONSTANTS;

const showTraceDebug = () => {
  if (!document.getElementById('debug-trace')) {
    setTimeout(() => showTraceDebug(), 300);
  } else {
    const traceState = window[sdkName]?.getTrace?.();

    document.getElementById('debug-trace').textContent = JSON.stringify(traceState, null, '\t');
  }
};

const showLocalstorageDebug = () => {
  if (!document.getElementById('debug-localstorage')) {
    setTimeout(() => showLocalstorageDebug(), 300);
  } else {
    const storageState = {
      to_consent: utils.Storage.find(CONSTANTS.consent.name)?.value,
      to_subid: utils.Storage.find(CONSTANTS.subid.name)?.value,
      to_cashback: utils.Storage.find(CONSTANTS.cashback.name)?.value,
      to_event_consent_id: utils.Storage.find(CONSTANTS.event_consent_id.name)?.value,
    };

    document.getElementById('debug-localstorage').textContent = JSON.stringify(storageState, null, '\t');
  }
};

const showCookieDebug = () => {
  if (!document.getElementById('debug-cookie')) {
    setTimeout(() => showCookieDebug(), 300);
  } else {
    const cookieState = {
      cmp_cookie: Cookies.get('klaro'),
      to_consent: Cookies.get(utils.getPrefixedCookieName(CONSTANTS.consent.name)),
      to_subid: Cookies.get(utils.getPrefixedCookieName(CONSTANTS.subid.name)),
      to_cashback: Cookies.get(utils.getPrefixedCookieName(CONSTANTS.cashback.name)),
      to_event_consent_id: Cookies.get(utils.getPrefixedCookieName(CONSTANTS.event_consent_id.name)),
    };

    document.getElementById('debug-cookie').textContent = JSON.stringify(cookieState, null, '\t');
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
      cashback: window[sdkName]?.cashback,
      to_event_consent_id: window[sdkName]?.eventConsentId,
    };

    document.getElementById('debug').textContent = JSON.stringify(state, null, '\t');
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
