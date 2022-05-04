export default {
  sdkName: '__ISDK',
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
    queryname: 'to_subid',
    ttl: 40,
  },
  trace: {
    name: 'trace',
    ttl: 40,
  },
  default_storage_prefix: 'to',
  default_ttl: 390,
};
