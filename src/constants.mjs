const cookieKeys = {
  consent: 'consent',
  event_consent_id: 'event_consent_id',
  subid: 'subid',
  cashback: 'cashback',
};

export default {
  sdk_name: '__ISDK',
  sdk_script_id: '__ISDK_ASSETS',
  cookie_max_size: 3900,
  current_storage_version: 'v2',
  previous_storage_version: null, // no version sufix defined for storage on V1
  cookieKeys,
  consent: {
    name: cookieKeys.consent,
    ttl: 390, // 13 mois
    status: {
      unknown: 'unknown',
      optin: 'optin',
      optout: 'optout',
    },
    compress: false,
  },
  event_consent_id: {
    name: cookieKeys.event_consent_id,
    ttl: 390,
    compress: false,
  },
  subid: {
    name: cookieKeys.subid,
    payloadType: 'consent',
    queryname: 'toSubid',
    ttl: 40,
    compress: true,
    type: 'Object',
  },
  cashback: {
    name: cookieKeys.cashback,
    payloadType: 'cashback',
    queryname: 'toCashback',
    ttl: 30,
    compress: true,
    type: 'Object',
  },
  events: {
    visit_promethee: 'visit_promethee',
  },
  stats: {
    type: {
      visit: 'visit',
      conversion: 'conversion',
      hit: 'hit',
    },
  },
  default_storage_prefix: 'to',
  default_ttl: 390,
  urls: {
    conversion: process.env.API_CONVERSION_URLS?.split(',') || [],
    stats: process.env.API_STATS_URLS?.split(',') || [],
    proofConsent: process.env.API_PROOF_CONSENT_URLS?.split(',') || [],
    registerIpFingerprint: process.env.API_REGISTER_IP_FINGERPRINT_URLS?.split(',') || [],
    events: process.env.API_EVENTS_URLS?.split(',') || [],
    deleteData: process.env.API_DELETE_DATA?.split(',') || [],
  },
  errors: { subidCookieType: 'subid_cookie_type' },
};
