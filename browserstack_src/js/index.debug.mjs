import '../../src/polyfill.mjs';

import { showDebugTestsite } from './utils.mjs';
import init from '../../src/init.mjs';
import Sdk from '../../src/Sdk.mjs';

class TogDebugSdk extends Sdk {
  constructor() {
    super();

    showDebugTestsite();
  }

  push(args) {
    super.push(args);
    showDebugTestsite();
  }
}

console.log(`
******************************
******************************
**** ISDK in debug mode ******
******************************
******************************
`);

init(TogDebugSdk);
showDebugTestsite();
