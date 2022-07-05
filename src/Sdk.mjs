/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import { v4 as uuidV4 } from 'uuid';

import * as utils from './utils.mjs';
import CONSTANTS from './constants.mjs';

export default class Sdk {
  #progids = [];

  #conversionUrlIterator = utils.getApiIterator(CONSTANTS.urls.conversion);

  #statsUrlIterator = utils.getApiIterator(CONSTANTS.urls.stats);

  #proofConsentUrlIterator = utils.getApiIterator(CONSTANTS.urls.proofConsent);

  #errors = [];

  constructor() {
    this.env = process.env.NODE_ENV;

    this.#setProgids();
    this.#configureProgramData(CONSTANTS.cashback);

    if (!this.consent) {
      this.#setConsent(CONSTANTS.consent.status.unknown);
    }

    if (this.consent === CONSTANTS.consent.status.optin) {
      this.#configureProgramData(CONSTANTS.subid);
    } else {
      this.#handleNoConsent();
    }
  }

  get consent() {
    return utils.getValue(CONSTANTS.consent.name);
  }

  get subid() {
    return (
      this.constructor.getProgramDataFromQueryParams(CONSTANTS.subid.queryname) || utils.getValue(CONSTANTS.subid.name)
    );
  }

  get cashbackSubid() {
    return (
      this.constructor.getProgramDataFromQueryParams(CONSTANTS.cashback.queryname) ||
      utils.getValue(CONSTANTS.cashback.name)
    );
  }

  get eventConsentId() {
    return utils.getValue(CONSTANTS.event_consent_id.name);
  }

  #setProgids() {
    try {
      const progids = document.getElementById(CONSTANTS.sdkScriptId)?.getAttribute('data-progids');

      if (progids) {
        this.#progids = JSON.parse(progids);
      }
    } catch (error) {
      this.#setError({ error, method: 'setProgids' });
    }
  }

  #configureProgramData({ name, queryname }) {
    const subid = this.constructor.getProgramDataFromQueryParams(queryname);

    if (subid) {
      utils.setValue(subid, name);
    }
  }

  async #callApi({ urlIterator, body = {}, caller }) {
    if (!urlIterator?.url) {
      this.#setError({ error: { message: `Failed to contact server on ${urlIterator?.urls}` }, caller });

      return;
    }

    try {
      const response = await fetch(urlIterator?.url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();

        this.#setError({
          error: { message: ` code ${response?.status} - ${error?.message}` },
          caller,
          extra: { body, url: this.#conversionUrlIterator.url },
        });
      }
    } catch (error) {
      urlIterator.next();
      this.#callApi({ urlIterator, body, caller });
    }
  }

  #logStats({ consent, type, progid }) {
    const toSubids = [this.subid, this.cashbackSubid].filter(Boolean);

    this.#callApi({
      urlIterator: this.#statsUrlIterator,
      body: {
        type,
        progid,
        status: consent,
        toSubids,
      },
      caller: '#logStats',
    });
  }

  #setPOC() {
    const eventConsentId = uuidV4();
    utils.setValue(eventConsentId, CONSTANTS.event_consent_id.name);

    const body = {
      event_consent_id: eventConsentId,
      url: `${window.location.hostname}${window.location.pathname}`,
    };

    this.#callApi({
      urlIterator: this.#proofConsentUrlIterator,
      body,
      caller: '#setPOC',
    });
  }

  #setConsent(consent) {
    const shouldLog = consent !== this.consent;
    const shouldSetupPOC = !this.eventConsentId && this.subid && consent === CONSTANTS.consent.status.optin;

    utils.setValue(consent, CONSTANTS.consent.name);

    if (shouldLog) {
      this.#progids.forEach((progid) => {
        this.#logStats({ consent, progid, type: CONSTANTS.stats.type.visit });
      });
    }

    if (shouldSetupPOC) {
      this.#setPOC();
    }
  }

  #handleNoConsent() {
    utils.removeValue(CONSTANTS.subid.name);
    utils.removeValue(CONSTANTS.event_consent_id.name);
  }

  _setOptin() {
    this.#setConsent(CONSTANTS.consent.status.optin);
    this.#configureProgramData(CONSTANTS.subid);
  }

  _setOptout() {
    this.#setConsent(CONSTANTS.consent.status.optout);
    this.#handleNoConsent();
  }

  _setUnknown() {
    this.#setConsent(CONSTANTS.consent.status.unknown);
    this.#handleNoConsent();
  }

  #canConvert() {
    return (
      this.cashbackSubid ||
      this.constructor.getProgramDataFromQueryParams(CONSTANTS.subid.queryname) ||
      (this.subid && this.consent === CONSTANTS.consent.status.optin)
    );
  }

  #setError(data) {
    this.#errors.push(data);
  }

  #getErrors() {
    return this.#errors.map(({ error, caller, extra }) => ({
      message: `While calling the method "${caller}": ${error.message}`,
      extra,
    }));
  }

  async #setConversion({ data = {}, caller = 'setConversion' }) {
    if (!this.#canConvert()) {
      throw new Error(`Make a conversion is not allowed. Check consent or ${CONSTANTS.subid.queryname}`);
    }

    const { progid, comid, iu } = data;

    if (!progid || !comid || !iu) {
      throw new Error(`Missing progid or comid or iu. Those data are mandatory to make a conversion`);
    }

    if (!this.#conversionUrlIterator?.url) {
      throw new Error(`Failed to contact server on ${JSON.stringify(this.#conversionUrlIterator?.urls)}`);
    }

    const toSubid = {
      type: 'consent',
      value: this.subid,
    };

    const toCashback = {
      type: 'cashback',
      value: this.cashbackSubid,
    };
    const toSubids = [toSubid, toCashback].filter(({ value }) => !!value);
    const payload = {
      ...data,
      event_consent_id: this.eventConsentId,
      toSubids,
    };

    const body = Object.fromEntries(Object.entries(payload).filter(([, value]) => !!value));

    await this.#callApi({
      urlIterator: this.#conversionUrlIterator,
      body,
      caller,
    });
  }

  async _setSale(data) {
    try {
      await this.#setConversion({ data, caller: '_setSale' });
    } catch (error) {
      this.#setError({ error, caller: '_setSale', extra: data });
    }
  }

  async _setLead(data) {
    try {
      await this.#setConversion({ data, caller: '_setLead' });
    } catch (error) {
      this.#setError({ error, caller: '_setLead', extra: data });
    }
  }

  async _setDbClick(data) {
    try {
      await this.#setConversion({ data, caller: '_setDbClick' });
    } catch (error) {
      this.#setError({ error, caller: '_setDbClick', extra: data });
    }
  }

  async _setClick(data) {
    try {
      await this.#setConversion({ data, caller: '_setClick' });
    } catch (error) {
      this.#setError({ error, caller: '_setClick', extra: data });
    }
  }

  addConversion(progid) {
    if (!progid) {
      throw new Error(`Missing progid. This data is mandatory to add a conversion`);
    }

    this.#logStats({ consent: this.consent, progid, type: CONSTANTS.stats.type.conversion });
  }

  push(args) {
    const [functionName, ...functionArgs] = args || [];

    try {
      if (typeof this[functionName] !== 'function') {
        throw new Error(`Undefined function ${functionName}`);
      }

      this[functionName](...functionArgs);
    } catch (error) {
      this.#setError({ error, method: functionName });
    }
  }

  getTrace() {
    return {
      env: this.env,
      progids: this.#progids,
      consent: this.consent,
      subid: this.subid,
      event_consent_id: this.eventConsentId,
      cashbackSubid: this.cashbackSubid,
      errors: this.#getErrors(),
      conversionUrls: CONSTANTS.urls.conversion,
    };
  }

  static getProgramDataFromQueryParams(name) {
    const queryParams = new URLSearchParams(window.location.search);

    return queryParams.get(name);
  }
}
