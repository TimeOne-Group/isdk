/* eslint-disable import/no-extraneous-dependencies */
import { enableFetchMocks } from 'jest-fetch-mock';

import './polyfill.mjs';

enableFetchMocks();

process.env.API_CONVERSION_URLS = 'https://fake-api/v1/b,https://fallback-fake-api/v1/b';
