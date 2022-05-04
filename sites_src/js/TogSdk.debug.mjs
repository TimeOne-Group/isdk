import TogSdk from '../../src/TogSdk.mjs';
import { showDebugTestsite } from './utils.mjs';

export default class TogDebugSdk extends TogSdk {
  constructor() {
    super();

    showDebugTestsite();
  }

  push(args) {
    super.push(args);
    showDebugTestsite();
  }
}
