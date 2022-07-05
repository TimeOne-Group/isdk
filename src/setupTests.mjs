/* eslint-disable import/no-extraneous-dependencies */
import { enableFetchMocks } from 'jest-fetch-mock';
import dotenv from 'dotenv';

import './polyfill.mjs';

enableFetchMocks();
dotenv.config({ path: './.env.test' });

jest.mock('uuid', () => ({
  v4: () => '993be906-9074-499a-aeb6-5af4e627aa06',
}));
