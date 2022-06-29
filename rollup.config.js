import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import babelLoaderExcludeNodeModulesExcept from 'babel-loader-exclude-node-modules-except';
import bundleSize from 'rollup-plugin-bundle-size';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import copy from 'rollup-plugin-cpy';
import postcss from 'rollup-plugin-postcss';
import dotenv from 'dotenv';

import pkg from './package.json';
import CONSTANTS from './src/constants.mjs';

const NODE_ENV = process.env.NODE_ENV || 'production';
dotenv.config({ path: `.env.${NODE_ENV}` });

console.log({
  NODE_ENV,
  API_CONVERSION_URLS: process.env.API_CONVERSION_URLS,
  API_STATS_URLS: process.env.API_STATS_URLS,
  API_PROOF_CONSENT_URLS: process.env.API_PROOF_CONSENT_URLS,
});

const banner = {
  banner() {
    return `/*! ${pkg.name} ${pkg.version} https://github.com/${pkg.homepage} @license ${pkg.license} */`;
  },
};
const defaultPlugins = [
  nodeResolve(),
  commonjs(),
  replace({
    preventAssignment: true,
    values: {
      'process.env.NODE_ENV': `"${NODE_ENV}"`,
      'process.env.API_CONVERSION_URLS': `"${process.env.API_CONVERSION_URLS}"`,
      'process.env.API_STATS_URLS': `"${process.env.API_STATS_URLS}"`,
      'process.env.API_PROOF_CONSENT_URLS': `"${process.env.API_PROOF_CONSENT_URLS}"`,
    },
  }),
  postcss({
    plugins: [],
  }),
  babel({
    babelHelpers: 'bundled',
    exclude: babelLoaderExcludeNodeModulesExcept([
      '@timeone-group/storage-js',
      'jssha',
      'js-cookie',
      'klaro',
      'core-js',
      'uuid',
    ]),
  }),
  banner,
  bundleSize(),
];

const dist = [
  {
    input: 'src/index.mjs',
    output: [
      {
        format: 'iife',
        file: 'dist/isdk.js',
      },
      {
        format: 'iife',
        file: 'dist/isdk.min.js',
        plugins: [terser()],
      },
    ],
    plugins: defaultPlugins,
  },
  {
    input: 'browserstack_src/js/index.debug.mjs',
    output: [
      {
        format: 'iife',
        file: 'debug/isdk.debug.js',
      },
      {
        format: 'iife',
        file: 'debug/isdk.debug.min.js',
        plugins: [terser()],
      },
    ],
    plugins: defaultPlugins,
  },
];

const sites = [
  {
    root: 'browserstack/site',
    sdk: 'browserstack_src/js/index.browserstack.mjs',
    init: 'browserstack_src/js/init.browserstack.mjs',
    minify: true,
    templates: ['browserstack.html'],
    templateVar: {
      __NAME__: 'browserstack',
    },
  },
].flatMap(({ sdk, init, root, minify, filesToCopy, templates, templateVar }) => {
  const plugins = minify ? [...defaultPlugins, terser()] : defaultPlugins;
  const templatePlugin = templates.map((template) =>
    htmlTemplate({
      template: `browserstack_src/html/${template}`,
      target: `${root}/index.html`,
      attrs: [`id="${CONSTANTS.sdkScriptId}"`, 'data-progids="[109]"', 'async'],
      replaceVars: {
        __SDK_SRC__: './sdk.js',
        ...templateVar,
      },
    })
  );
  const defaultFiles = ['browserstack_src/js/tag.js', 'browserstack_src/html/favicon.svg'];
  const files = filesToCopy ? [...filesToCopy, ...defaultFiles] : defaultFiles;
  const copyPlugin = copy({
    files,
    dest: root,
    options: {
      verbose: true,
    },
  });

  return [
    {
      input: sdk,
      output: [
        {
          format: 'iife',
          file: `${root}/sdk.js`,
        },
      ],
      plugins,
    },
    {
      input: init,
      output: [
        {
          format: 'iife',
          file: `${root}/init.js`,
        },
      ],
      plugins: [...plugins, copyPlugin],
    },
    {
      input: 'browserstack_src/js/common.js',
      output: [
        {
          format: 'iife',
          file: `${root}/common.js`,
        },
      ],
      plugins: [...plugins, ...templatePlugin],
    },
  ];
});

export default [...dist, ...sites];
