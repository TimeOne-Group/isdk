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

  #registerIpFingerprintUrlIterator = utils.getApiIterator(CONSTANTS.urls.registerIpFingerprint);

  #logEventUrlIterator = utils.getApiIterator(CONSTANTS.urls.events);

  #deleteDataUrlIterator = utils.getApiIterator(CONSTANTS.urls.deleteData);

  #errors = [];

  #name = CONSTANTS.sdk_name;

  #hit = null;

  constructor() {
    this.env = process.env.NODE_ENV;
    this.version = process.env.SDK_VERSION;

    this.#setProgids();
    this.#setCookieDomain();
    this.#configureProgramData(CONSTANTS.cashback);

    // Need to wait progids to be set
    this.#logHit({ consent: this.consent });
    this.#logEvent({ type: CONSTANTS.events.visit_promethee });

    if (!this.consent) {
      this.#setConsent(CONSTANTS.consent.status.unknown);
    }

    if (this.consent === CONSTANTS.consent.status.optin) {
      this.#configureProgramData(CONSTANTS.subid);
    } else {
      this.#handleNoConsent();
    }
  }

  get consentSubids() {
    return this.#getActiveSubids(CONSTANTS.subid);
  }

  get cashbackSubids() {
    return this.#getActiveSubids(CONSTANTS.cashback);
  }

  get consent() {
    return utils.getValue(CONSTANTS.consent.name);
  }

  get eventConsentId() {
    return utils.getValue(CONSTANTS.event_consent_id.name);
  }

  getName() {
    return this.#name;
  }

  #runRetrocompatibility() {
    const previousStorageVersion = CONSTANTS.previous_storage_version;

    const consent = utils.getValue(CONSTANTS.consent.name, previousStorageVersion);
    const eventConsentId = utils.getValue(CONSTANTS.event_consent_id.name, previousStorageVersion);
    const consentSubid = utils.getValue(CONSTANTS.subid.name, previousStorageVersion);
    const cashbackSubid = utils.getValue(CONSTANTS.cashback.name, previousStorageVersion);

    if (consent) {
      utils.setValue(consent, CONSTANTS.consent.name);
    }

    if (eventConsentId) {
      utils.setValue(eventConsentId, CONSTANTS.event_consent_id.name);
    }

    if (consentSubid) {
      utils.setValue(this.#convertSubidFromPreviousToNextFormat(consentSubid), CONSTANTS.subid.name);
    }

    if (cashbackSubid) {
      utils.setValue(this.#convertSubidFromPreviousToNextFormat(cashbackSubid), CONSTANTS.cashback.name);
    }

    utils.removeValue(CONSTANTS.consent.name, previousStorageVersion);
    utils.removeValue(CONSTANTS.event_consent_id.name, previousStorageVersion);
    utils.removeValue(CONSTANTS.subid.name, previousStorageVersion);
    utils.removeValue(CONSTANTS.cashback.name, previousStorageVersion);
  }

  #convertSubidFromPreviousToNextFormat(subid) {
    return this.#formatSubidEntry(subid);
  }

  #formatSubidEntry(subid) {
    if (!subid) {
      return {};
    }

    return { [subid]: utils.getCurrentTimestamp() };
  }

  #getActiveSubids({ name, queryname, ttl } = {}) {
    const subidQueryParam = this.constructor.getProgramDataFromQueryParams(queryname);

    const storedSubids = utils.getValue(name);
    const subidQueryParamEntry = this.#formatSubidEntry(subidQueryParam);

    if (!storedSubids) {
      return subidQueryParamEntry;
    }

    try {
      const subids = storedSubids;

      if (utils.isObject(subids) && Object.keys(subids).length > 0) {
        const activeStoredSubids = utils.filterUnActiveSubids(subids, ttl);
        const activeSubids = { ...activeStoredSubids, ...subidQueryParamEntry };
        const maxSubids = utils.getMaxSubids(activeSubids);

        return maxSubids;
      }

      return subidQueryParamEntry;
    } catch (error) {
      this.#setError({ error, caller: '#getActiveSubids', extra: { name, storedSubids } });

      return subidQueryParamEntry;
    }
  }

  #getActiveSubidsValues(options = {}) {
    return Object.keys(this.#getActiveSubids(options));
  }

  #getToSubids() {
    const consentSubids = this.#getActiveSubidsValues(CONSTANTS.subid);
    const cashbackSubids = this.#getActiveSubidsValues(CONSTANTS.cashback);

    return [...consentSubids, ...cashbackSubids].filter(Boolean);
  }

  #getToSubidsWithType() {
    const consentSubids = this.#getActiveSubidsValues(CONSTANTS.subid);
    const cashbackSubids = this.#getActiveSubidsValues(CONSTANTS.cashback);

    const toSubids = consentSubids.map((subid) => ({
      type: CONSTANTS.subid.payloadType,
      value: subid,
    }));

    const toCashbackSubids = cashbackSubids.map((cashbackSubid) => ({
      type: CONSTANTS.cashback.payloadType,
      value: cashbackSubid,
    }));

    return [...toSubids, ...toCashbackSubids].filter(({ value }) => !!value);
  }

  #setProgids() {
    try {
      const progids = document.getElementById(CONSTANTS.sdk_script_id)?.getAttribute('data-progids');

      if (progids) {
        this.#progids = JSON.parse(progids);
      }

      if (!progids && window.__ISDK_progid) {
        this.#progids = Array.isArray(window.__ISDK_progid) ? window.__ISDK_progid : [window.__ISDK_progid];
      }
    } catch (error) {
      this.#setError({ error, caller: 'setProgids' });
    }
  }

  #shouldUseWildcardDomain() {
    const wildCardDomainFromAttribut = document
      .getElementById(CONSTANTS.sdk_script_id)
      ?.getAttribute('data-wildcard-domain');

    return (
      wildCardDomainFromAttribut === 'true' ||
      window.__ISDK_wildcard_domain === 'true' ||
      window.__ISDK_wildcard_domain === true
    );
  }

  #setCookieDomain() {
    try {
      if (this.#shouldUseWildcardDomain()) {
        // First we clean all data in storage
        Object.values(CONSTANTS.cookieKeys).forEach((name) => {
          utils.removeValue(name);
        });

        // Then we define the wildcard domain for cookie
        utils.setCookieWildCardDomain();
      }
    } catch (error) {
      this.#setError({ error, caller: 'setCookieDomain' });
    }
  }

  #configureProgramData(options) {
    const subids = this.#getActiveSubids(options);

    if (subids && Object.keys(subids)?.length > 0) {
      utils.setValue(subids, options.name);
    }
  }

  async #callApi({ method = 'POST', urlIterator, body = {}, caller }) {
    if (!urlIterator?.url) {
      this.#setError({ error: { message: `Failed to contact server on ${urlIterator?.urls}` }, caller });

      return;
    }

    try {
      const response = await fetch(urlIterator?.url, {
        method,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const error = await response.json();

        this.#setError({
          error: { message: `code ${response?.status} - ${error?.message}` },
          caller,
          extra: { body, url: this.#conversionUrlIterator.url },
        });
      }
    } catch (error) {
      urlIterator.next();
      this.#callApi({ urlIterator, body, caller });
    }
  }

  #logEvent({ type }) {
    try {
      const toSubids = [CONSTANTS.subid, CONSTANTS.cashback]
        .map(({ queryname, payloadType }) => {
          const value = this.constructor.getProgramDataFromQueryParams(queryname);

          if (value) {
            return {
              type: payloadType,
              value,
            };
          }

          return null;
        })
        .filter(Boolean);

      if (toSubids.length > 0) {
        this.#callApi({
          urlIterator: this.#logEventUrlIterator,
          body: {
            type,
            toSubids,
          },
          caller: '#logEvent',
        });
      }
    } catch (error) {
      this.#setError({ error, caller: 'logEvent', extra: { type } });
    }
  }

  #logHit({ consent }) {
    const shouldNotLog = !consent || this.#hit?.consent === consent;

    if (shouldNotLog) {
      return;
    }

    const eventTimestamp = Math.round(Date.now() / 1000);

    this.#progids.forEach((progid) => {
      if (this.#hit) {
        this.#logStats({ ...this.#hit, progid, count: '-1' });
      }

      const hit = {
        type: CONSTANTS.stats.type.hit,
        progid,
        consent,
        url: utils.getCurrentUrl(),
        event_timestamp: eventTimestamp,
        count: '1',
      };

      this.#hit = hit;

      this.#logStats(hit);
    });
  }

  #logStats({ consent, ...data }) {
    const toSubids = this.#getToSubids();

    this.#callApi({
      urlIterator: this.#statsUrlIterator,
      body: {
        ...data,
        url: utils.getCurrentUrl(),
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
      url: utils.getCurrentUrl(),
    };

    this.#callApi({
      urlIterator: this.#proofConsentUrlIterator,
      body,
      caller: '#setPOC',
    });
  }

  #hasSubids(options) {
    const subids = this.#getActiveSubidsValues(options);

    return subids?.length > 0;
  }

  #registerIpFingerprint() {
    const toSubids = this.#getToSubidsWithType();

    this.#progids.forEach((progid) => {
      const body = {
        progid,
        event_consent_id: this.eventConsentId,
        toSubids,
      };

      this.#callApi({
        urlIterator: this.#registerIpFingerprintUrlIterator,
        body,
        caller: '#registerIpFingerprint',
      });
    });
  }

  #setConsent(consent) {
    this.#logHit({ consent });

    const shouldSetConsent = consent !== this.consent;

    if (shouldSetConsent) {
      utils.setValue(consent, CONSTANTS.consent.name);
      this.#progids.forEach((progid) => {
        this.#logStats({ type: CONSTANTS.stats.type.visit, progid, consent });
      });
    }

    const shouldSetupPOC =
      consent === CONSTANTS.consent.status.optin && !this.eventConsentId && this.#hasSubids(CONSTANTS.subid);

    if (shouldSetupPOC) {
      this.#setPOC();
    }

    // We need to wait for setPOC to retrieve event-consent-id
    const shouldRegisterIpAndFingerprint =
      consent === CONSTANTS.consent.status.optin &&
      this.eventConsentId &&
      (this.#hasSubids(CONSTANTS.subid) || this.#hasSubids(CONSTANTS.cashbackSubid));

    if (shouldRegisterIpAndFingerprint) {
      this.#registerIpFingerprint();
    }
  }

  #handleNoConsent() {
    utils.removeValue(CONSTANTS.subid.name);
    utils.removeValue(CONSTANTS.event_consent_id.name);

    this.#progids.forEach((progid) => {
      this.#callApi({
        urlIterator: this.#deleteDataUrlIterator,
        method: 'DELETE',
        body: {
          progid,
        },
        caller: '#handleNoConsent',
      });
    });
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
      this.constructor.getProgramDataFromQueryParams(CONSTANTS.subid.queryname) ||
      this.#hasSubids(CONSTANTS.cashback) ||
      this.consent === CONSTANTS.consent.status.optin
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

    const payload = {
      ...data,
      event_consent_id: this.eventConsentId,
      toSubids: this.#getToSubidsWithType(),
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

  addConversion(progid, { comid } = {}) {
    if (!progid) {
      throw new Error(`Missing progid. This data is mandatory to add a conversion`);
    }

    this.#logStats({
      type: CONSTANTS.stats.type.conversion,
      progid,
      comid,
      consent: this.consent,
    });
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
      consentSubids: this.consentSubids,
      event_consent_id: this.eventConsentId,
      cashbackSubids: this.cashbackSubids,
      errors: this.#getErrors(),
      conversionUrls: CONSTANTS.urls.conversion,
      useWildcardCookieDomain: this.#shouldUseWildcardDomain(),
    };
  }

  static getProgramDataFromQueryParams(name) {
    const queryParams = new URLSearchParams(window.location.search);

    return queryParams.get(name);
  }
}
