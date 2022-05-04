/* eslint-disable class-methods-use-this */
import { AppError, Severity } from '@timeone-group/error-logger-js';

import * as helpers from './utils.mjs';
import CONSTANTS from './constants.mjs';

export default class TogSdk {
  constructor() {
    this.env = 'prod';

    if (this.consent === CONSTANTS.consent.status.optin) {
      this.#configureSubid();
    } else {
      this.#handleNoConsent();
    }
  }

  get consent() {
    return helpers.getValue(CONSTANTS.consent.name) ?? CONSTANTS.consent.status.unknown;
  }

  get subid() {
    return helpers.getValue(CONSTANTS.subid.name);
  }

  #configureSubid() {
    const subid = this.constructor.getSubidFromQueryParams();

    if (subid) {
      helpers.setValue(subid, CONSTANTS.subid.name);
    }
  }

  #setConsent(consent, options = {}) {
    helpers.setValue(consent, CONSTANTS.consent.name);

    const { progid } = options;
    this.progid = progid;
  }

  #handleNoConsent() {
    helpers.removeValue(CONSTANTS.subid.name);
  }

  setOptin({ progid } = {}) {
    this.#setConsent(CONSTANTS.consent.status.optin, { progid });
    this.#configureSubid();
  }

  setOptout({ progid } = {}) {
    this.#setConsent(CONSTANTS.consent.status.optout, { progid });
    this.#handleNoConsent();
  }

  setUnknown({ progid } = {}) {
    this.#setConsent(CONSTANTS.consent.status.unknown, { progid });
    this.#handleNoConsent();
  }

  #canTrack() {
    return this.subid && this.consent === CONSTANTS.consent.status.optin;
  }

  setConversion() {
    if (this.#canTrack()) {
      alert('Call On Me, call back');
    } else {
      alert('Big RGPD is watching you');
    }
  }

  push(args) {
    const [functionName, ...functionArgs] = args || [];

    if (typeof this[functionName] !== 'function') {
      throw new AppError(Severity.ERROR, `Undefined function ${functionName}`);
    }

    return this[functionName](...functionArgs);
  }

  getTrace() {
    return {
      progid: this.progids,
      consent: this.consent,
      subid: this.subid,
    };
  }

  static getSubidFromQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);

    return queryParams.get(CONSTANTS.subid.queryname);
  }
}
