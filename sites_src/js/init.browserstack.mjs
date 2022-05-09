/* eslint-disable no-underscore-dangle */
import '../../src/polyfill.mjs';
import { showDebug } from './utils.mjs';

window.SDKsetUnknown = function () {
  console.log('SDKsetUnknown');
  window.__SDKsetUnknown();

  showDebug();
};

window.SDKsetOptin = function () {
  console.log('SDKsetOptin');
  window.__SDKsetOptin();

  showDebug();
};

window.SDKsetOptout = function () {
  console.log('SDKsetOptout');
  window.__SDKsetOptout();

  showDebug();
};
