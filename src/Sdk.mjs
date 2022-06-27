/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */

import * as utils from './utils.mjs';
import CONSTANTS from './constants.mjs';

export default class Sdk {
  #progids = [];

  #conversionUrlIterator = utils.urlsIterator(CONSTANTS.urls.conversion);

  #statsConsentUrlIterator = utils.urlsIterator(CONSTANTS.urls.statsConsent);

  #conversionUrl = this.#conversionUrlIterator.next().value;

  #statsConsentUrl = this.#statsConsentUrlIterator.next().value;

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
      utils.getValue(CONSTANTS.subid.name) || this.constructor.getProgramDataFromQueryParams(CONSTANTS.subid.queryname)
    );
  }

  get cashbackSubid() {
    return (
      utils.getValue(CONSTANTS.cashback.name) ||
      this.constructor.getProgramDataFromQueryParams(CONSTANTS.cashback.queryname)
    );
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

  #setNextStatsConsentUrl() {
    this.#statsConsentUrl = this.#statsConsentUrlIterator.next().value;
  }

  #logStatsConsent(consent) {
    const toSubids = [
      this.constructor.getProgramDataFromQueryParams(CONSTANTS.subid.queryname),
      this.constructor.getProgramDataFromQueryParams(CONSTANTS.cashback.queryname),
    ].filter(Boolean);

    this.#log({
      url: this.#statsConsentUrl,
      setNextUrl: this.#setNextStatsConsentUrl,
      body: {
        status: consent,
        toSubids,
      },
    });
  }

  #log({ url, setNextUrl, body }) {
    console.log({ url });
    if (!url) {
      this.#setError({ error: { message: `Failed to contact server on ${url}` }, method: '#log' });

      return;
    }

    this.#progids.forEach((progid) => {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          progid,
          ...body,
        }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const error = await res.json();
            this.#setError({ error: { message: `${res?.status} - ${error?.message}` }, method: '#log' });
          }
        })
        .catch(() => {
          console.log('ctach 1');
          setNextUrl();
          console.log('ctach 2');
          this.#log({ url, setNextUrl, body });
        });
    });
  }

  #setConsent(consent) {
    const shouldLog = consent !== this.consent;

    utils.setValue(consent, CONSTANTS.consent.name);

    if (shouldLog) {
      this.#logStatsConsent(consent);
    }
  }

  #handleNoConsent() {
    utils.removeValue(CONSTANTS.subid.name);
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
      value: this.subid,
    };
    const toCashback = {
      type: 'cashback',
      value: this.cashbackSubid,
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

  async _setSale(data) {
    try {
      await this.#setConversion({ data, method: '_setSale' });
    } catch (error) {
      this.#setError({ error, method: '_setSale', extra: data });
    }
  }

  async _setLead(data) {
    try {
      await this.#setConversion({ data, method: '_setLead' });
    } catch (error) {
      this.#setError({ error, method: '_setLead', extra: data });
    }
  }

  async _setDbClick(data) {
    try {
      await this.#setConversion({ data, method: '_setDbClick' });
    } catch (error) {
      this.#setError({ error, method: '_setDbClick', extra: data });
    }
  }

  async _setClick(data) {
    try {
      await this.#setConversion({ data, method: '_setClick' });
    } catch (error) {
      this.#setError({ error, method: '_setClick', extra: data });
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
