import Cookies from 'js-cookie';
import * as utils from '../../src/utils.mjs';
import CONSTANTS from '../../src/constants.mjs';

const { sdk_name: sdkName } = CONSTANTS;

// const showJwtDebug = (name, id) => {
//   if (!document.getElementById(id)) {
//     setTimeout(() => showJwtDebug(name, id), 300);
//   } else {
//     // eslint-disable-next-line no-underscore-dangle
//     const token = window[sdk_name]?.[name];
//     if (token) {
//       // eslint-disable-next-line no-underscore-dangle
//       const jwt = 'jwt'; // window.__jwtDecode(`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${token}`);

//       document.getElementById(id).textContent = JSON.stringify(jwt, null, '\t');
//     }
//   }
// };

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
      to_consent: utils.Storage.find(utils.getPrefixedStorageName(CONSTANTS.consent.name)),
      to_subid: utils.Storage.find(utils.getPrefixedStorageName(CONSTANTS.subid.name)),
      to_cashback: utils.Storage.find(utils.getPrefixedStorageName(CONSTANTS.cashback.name)),
      to_event_consent_id: utils.Storage.find(utils.getPrefixedStorageName(CONSTANTS.event_consent_id.name)),
    };
    const sanitizedStorageState = Object.fromEntries(
      Object.entries(storageState).map(([key, value]) => (value === null ? [key, undefined] : [key, value]))
    );
    document.getElementById('debug-localstorage').textContent = JSON.stringify(sanitizedStorageState, null, '\t');
  }
};

const showCookieDebug = () => {
  if (!document.getElementById('debug-cookie')) {
    setTimeout(() => showCookieDebug(), 300);
  } else {
    const cookieState = {
      cmp_cookie: Cookies.get('klaro'),
      to_consent: Cookies.get(utils.getPrefixedStorageName(CONSTANTS.consent.name)),
      to_subid: Cookies.get(utils.getPrefixedStorageName(CONSTANTS.subid.name)),
      to_cashback: Cookies.get(utils.getPrefixedStorageName(CONSTANTS.cashback.name)),
      to_event_consent_id: Cookies.get(utils.getPrefixedStorageName(CONSTANTS.event_consent_id.name)),
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
    // showJwtDebug?.('subid', 'debug-subid-jwt');
    // showJwtDebug?.('cashbackSubid', 'debug-cashback-jwt');
  });
};
