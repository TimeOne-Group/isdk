import Cookies from 'js-cookie';
import '../../src/polyfill.mjs';

import init from '../../src/init.mjs';
import Sdk from '../../src/Sdk.mjs';
import { Storage } from '../../src/utils.mjs';
import { showDebug } from './utils.mjs';

window.TOG_Storage = Storage;
window.TOG_Cookies = Cookies;

init(Sdk);
showDebug();
console.log('SDK loaded');
