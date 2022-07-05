export default {
  sdkName: '__ISDK',
  sdkScriptId: '__ISDK_ASSETS',
  consent: {
    name: 'consent',
    ttl: 390, // 13 mois
    status: {
      unknown: 'unknown',
      optin: 'optin',
      optout: 'optout',
    },
  },
  event_consent_id: {
    name: 'event_consent_id',
    ttl: 390,
  },
  subid: {
    name: 'subid',
    queryname: 'toSubid',
    ttl: 40,
  },
  cashback: {
    name: 'cashback',
    queryname: 'toCashback',
    ttl: 30,
  },
  stats: {
    type: {
      visit: 'visit',
      conversion: 'conversion',
    },
  },
  default_storage_prefix: 'to',
  default_ttl: 390,
  urls: {
    conversion: process.env.API_CONVERSION_URLS?.split(',') || [],
    stats: process.env.API_STATS_URLS?.split(',') || [],
    proofConsent: process.env.API_PROOF_CONSENT_URLS?.split(',') || [],
  },
};
