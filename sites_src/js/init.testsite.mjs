/* eslint-disable import/no-extraneous-dependencies */
// import 'core-js/stable';
import Cookies from 'js-cookie';
import '../../src/polyfill.mjs';

try {
  window.cleanKlaroCookie = function () {
    // eslint-disable-next-line no-undef
    Cookies.remove('klaro', { path: '/', domain: window.location.hostname });

    setTimeout(() => {
      document.location.reload();
    }, 500);
  };

  const klaroConfig = {
    elementID: 'klaro',
    appElement: '#app',
    cookieName: 'klaro',
    cookieExpiresAfterDays: 365,
    cookieDomain: window.location.hostname,
    stringifyCookie: (contents) => JSON.stringify(contents),
    parseCookie: (cookie) => JSON.parse(cookie),
    privacyPolicy: 'https://github.com/TimeOne-Group/pbd-sdk',
    mustConsent: false,
    mustNotice: false,
    logo: false,
    debug: true,
    translations: {
      en: {
        consentModal: {
          description: 'This is an example of how to override an existing translation already used by Orejime',
        },
        partners: {
          description: 'Example of an inline tracking script',
        },
        testcmp: {
          description: 'Example of an external tracking script',
        },
        purposes: {
          analytics: 'Analytics - TO tracker',
          security: 'Security',
        },
        categories: {
          analytics: {
            description: 'A long form description of the category.',
          },
        },
      },
    },
    services: [
      {
        name: 'testcmp',
        title: 'Consent for sdk',
        purposes: ['analytics'],
        callback(consent) {
          if (!Cookies.get('klaro')) {
            console.log('CMP setUnknown ');

            window.onUserAction(['setUnknown']);
          } else if (consent) {
            console.log('CMP setOptin');
            window.onUserAction(['setOptin']);
          } else {
            console.log('CMP setOptout');
            window.onUserAction(['setOptout']);
          }
        },
        required: false,
        default: true,
        optOut: false,
        onlyOnce: true,
      },
      {
        name: 'partners',
        title: 'Partners',
        purposes: ['advertising'],
        required: false,
        optOut: false,
        default: true,
        onlyOnce: true,
      },
    ],
    categories: [
      {
        name: 'analytics',
        title: 'Analytics',
        apps: ['test-cmp', 'partners', 'external-tracker'],
      },
    ],
  };

  window.onload = function () {
    try {
      window.klaro.setup(klaroConfig);
      window.klaro.show();
    } catch (e) {
      alert(e.message);
    }
  };
} catch (e) {
  alert(e.message);
}
