import '../../src/polyfill.mjs';
import { showDebug } from './utils.mjs';

window.SDKsetUnknown = function () {
  console.log('SDKsetUnknown');
  window.onUserAction(['setUnknown']);

  showDebug();
};

window.SDKsetOptin = function () {
  console.log('SDKsetOptin');
  window.onUserAction(['setOptin']);

  showDebug();
};

window.SDKsetOptout = function () {
  console.log('SDKsetOptout');
  window.onUserAction(['setOptout']);

  showDebug();
};
