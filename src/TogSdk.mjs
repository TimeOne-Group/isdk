/* eslint-disable class-methods-use-this */
import { AppError, Severity } from '@timeone-group/error-logger-js';

import * as helpers from './utils.mjs';
import CONSTANTS from './constants.mjs';

export default class TogSdk {
  #progids = [];

  constructor() {
    this.env = 'prod';

    this.#setProgids();

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

  #setProgids() {
    try {
      const progids = document.getElementById(CONSTANTS.sdkScriptId)?.getAttribute('data-progids');

      if (progids) {
        this.#progids = JSON.parse(progids);
      }
    } catch (e) {
      console.error(e);
    }
  }

  #configureSubid() {
    const subid = this.constructor.getSubidFromQueryParams();

    if (subid) {
      helpers.setValue(subid, CONSTANTS.subid.name);
    }
  }

  #setConsent(consent) {
    helpers.setValue(consent, CONSTANTS.consent.name);
  }

  #handleNoConsent() {
    helpers.removeValue(CONSTANTS.subid.name);
  }

  setOptin() {
    this.#setConsent(CONSTANTS.consent.status.optin);
    this.#configureSubid();
  }

  setOptout() {
    this.#setConsent(CONSTANTS.consent.status.optout);
    this.#handleNoConsent();
  }

  setUnknown() {
    this.#setConsent(CONSTANTS.consent.status.unknown);
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
      progids: this.#progids,
      consent: this.consent,
      subid: this.subid,
    };
  }

  static getSubidFromQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);

    return queryParams.get(CONSTANTS.subid.queryname);
  }
}
