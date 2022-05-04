import '../../src/polyfill.mjs';

import { showDebugTestsite } from './utils.mjs';
import init from '../../src/init.mjs';
import TogDebugSdk from './TogSdk.debug.mjs';

console.log(`
******************************
******************************
*** TOG_SDK in debug mode ****
******************************
******************************
`);

init(TogDebugSdk);
showDebugTestsite();
