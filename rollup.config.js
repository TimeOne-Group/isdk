import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';
import babelLoaderExcludeNodeModulesExcept from 'babel-loader-exclude-node-modules-except';

import pkg from './package.json';

const banner = {
  banner() {
    return `/*! ${pkg.name} ${pkg.version} https://github.com/${pkg.homepage} @license ${pkg.license} */`;
  },
};

const plugins = [
  nodeResolve(),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    exclude: babelLoaderExcludeNodeModulesExcept([
      '@timeone-group/error-logger-js',
      '@timeone-group/storage-js',
      'jssha',
      'js-cookie',
      'klaro',
      'core-js',
    ]),
  }),
  banner,
];

const dist = [
  {
    input: 'src/index.mjs',
    output: [
      {
        format: 'iife',
        file: 'dist/index.js',
      },
      {
        format: 'iife',
        file: 'dist/index.min.js',
        plugins: [terser()],
      },
    ],
    plugins,
  },
];
const testSite = [
  {
    input: 'site_src/index.testsite.mjs',
    output: [
      {
        format: 'iife',
        file: 'docs/sdk.testsite.js',
      },
    ],
    plugins,
  },
  {
    input: 'site_src/init.testsite.mjs',
    output: [
      {
        format: 'iife',
        file: 'docs/init.testsite.js',
      },
    ],
    plugins,
  },
];

const browserstack = [
  {
    input: 'site_src/index.browserstack.mjs',
    output: [
      {
        format: 'iife',
        file: 'docs/sdk.browserstack.js',
        plugins: [terser()],
      },
    ],
    plugins,
  },

  {
    input: 'site_src/init.browserstack.mjs',
    output: [
      {
        format: 'iife',
        file: 'docs/init.browserstack.js',
        plugins: [terser()],
      },
    ],
    plugins,
  },
];

export default [...dist, ...testSite, ...browserstack];
