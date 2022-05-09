/* eslint-disable import/no-extraneous-dependencies */
import { enableFetchMocks } from 'jest-fetch-mock';
import dotenv from 'dotenv';

import './polyfill.mjs';

enableFetchMocks();
dotenv.config({ path: '.env.test' });
