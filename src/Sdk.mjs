/* eslint-disable class-methods-use-this */

import * as utils from './utils.mjs';
import CONSTANTS from './constants.mjs';

export default class Sdk {
  #progids = [];

  #conversionUrlIterator = utils.urlsIterator(CONSTANTS.urls.conversion);

  #conversionUrl = this.#conversionUrlIterator.next().value;

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
    return utils.getValue(CONSTANTS.subid.name);
  }

  get cashbackSubid() {
    return utils.getValue(CONSTANTS.cashback.name);
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

  #setNextConversionUrl() {
    this.#conversionUrl = this.#conversionUrlIterator.next().value;
  }

  #log({ type, value }) {
    this.#progids.forEach((progid) => {
      if (process.env.NODE_ENV === 'sandbox') {
        // eslint-disable-next-line no-console
        console.log(`LOG | progid #${progid} - ${type} to ${value}`);
      }
    });
  }

  #setConsent(consent) {
    const shouldLog = consent !== this.consent;

    utils.setValue(consent, CONSTANTS.consent.name);

    if (shouldLog) {
      this.#log({ type: 'consent', value: consent });
    }
  }

  #handleNoConsent() {
    utils.removeValue(CONSTANTS.subid.name);
  }

  setOptin() {
    this.#setConsent(CONSTANTS.consent.status.optin);
    this.#configureProgramData(CONSTANTS.subid);
  }

  setOptout() {
    this.#setConsent(CONSTANTS.consent.status.optout);
    this.#handleNoConsent();
  }

  setUnknown() {
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
    return this.#errors.map(({ error, method, extra }) => ({
      message: `While calling "${method}" method: ${error.message}`,
      extra,
    }));
  }

  async #setConversion({ data = {}, method = 'setConversion' }) {
    if (!this.#canConvert()) {
      throw new Error(`Make a conversion is not allowed. Check consent or ${CONSTANTS.subid.queryname}`);
    }

    const { progid, comid, iu } = data;

    if (!progid || !comid || !iu) {
      throw new Error(`Missing progid or comid or iu. Those data are mandatory to make a conversion`);
    }

    if (!this.#conversionUrl) {
      throw new Error(`Failed to contact server on ${JSON.stringify(CONSTANTS.urls.conversion)}`);
    }

    const toSubid = {
      type: 'consent',
      value: this.subid || this.constructor.getProgramDataFromQueryParams(CONSTANTS.subid.queryname),
    };
    const toCashback = {
      type: 'cashback',
      value: this.cashbackSubid || this.constructor.getProgramDataFromQueryParams(CONSTANTS.cashback.queryname),
    };
    const toSubids = [toSubid, toCashback].filter(({ value }) => !!value);

    const payload = {
      ...data,
      toSubids,
    };

    const sanitizedPayload = Object.fromEntries(Object.entries(payload).filter(([, value]) => !!value));

    try {
      const response = await fetch(this.#conversionUrl, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedPayload),
      });

      if (!response.ok) {
        const error = await response.json();

        this.#setError({ error, method, extra: { ...data, url: this.#conversionUrl } });
      }
    } catch (error) {
      this.#setError({ error, method, extra: { ...data, url: this.#conversionUrl } });
      this.#setNextConversionUrl();

      await this.#setConversion({ data, method });
    }
  }

  async setSale(data) {
    try {
      await this.#setConversion({ data, method: 'setSale' });
    } catch (error) {
      this.#setError({ error, method: 'setSale', extra: data });
    }
  }

  async setLead(data) {
    try {
      await this.#setConversion({ data, method: 'setLead' });
    } catch (error) {
      this.#setError({ error, method: 'setLead', extra: data });
    }
  }

  async setDbClick(data) {
    try {
      await this.#setConversion({ data, method: 'setDbClick' });
    } catch (error) {
      this.#setError({ error, method: 'setDbClick', extra: data });
    }
  }

  async setClick(data) {
    try {
      await this.#setConversion({ data, method: 'setClick' });
    } catch (error) {
      this.#setError({ error, method: 'setClick', extra: data });
    }
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
