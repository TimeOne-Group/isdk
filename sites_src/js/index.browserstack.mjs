import '../../src/polyfill.mjs';

import init from '../../src/init.mjs';
import TogSdk from '../../src/TogSdk.mjs';
import { Storage } from '../../src/utils.mjs';
import { showDebug } from './utils.mjs';

window.TOG_Storage = Storage;

init(TogSdk);
showDebug();
console.log('SDK loaded');
