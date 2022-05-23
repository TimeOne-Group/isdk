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
  subid: {
    name: 'subid',
    queryname: 'toSubid',
    ttl: 40,
  },
  default_storage_prefix: 'to',
  default_ttl: 390,
  urls: {
    conversion: process.env.API_CONVERSION_URLS?.split(',') || [],
  },
};
