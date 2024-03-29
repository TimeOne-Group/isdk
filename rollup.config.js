import { readFileSync } from 'node:fs';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import babelLoaderExcludeNodeModulesExcept from 'babel-loader-exclude-node-modules-except';
import bundleSize from 'rollup-plugin-bundle-size';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import copy from 'rollup-plugin-copy';
import postcss from 'rollup-plugin-postcss';
import dotenv from 'dotenv';

import CONSTANTS from './src/constants.mjs';

const pkg = JSON.parse(readFileSync('./package.json'));
const NODE_ENV = process.env.NODE_ENV || 'production';
const globalEnv = dotenv.config({ path: `.env.${NODE_ENV}` }).parsed;

function getSdkVersion(env) {
  return `${pkg.version}${env.SDK_VERSION_SUFFIX || ''}`;
}

console.log({
  ...globalEnv,
  NODE_ENV,
  SDK_VERSION: getSdkVersion(globalEnv),
});

const banner = {
  banner() {
    return `/*! ${pkg.name} ${pkg.version} ${pkg.homepage} @license ${pkg.license} */`;
  },
};

const getDefaultPlugins = ({ env = NODE_ENV } = {}) => {
  let buildEnv = globalEnv;

  if (env) {
    buildEnv = dotenv.config({ path: `.env.${env}` })?.parsed || globalEnv;
  }

  console.log({ env: `.env.${env}`, buildEnv });

  return [
    nodeResolve(),
    commonjs(),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': `"${buildEnv.NODE_ENV}"`,
        'process.env.API_CONVERSION_URLS': `"${buildEnv.API_CONVERSION_URLS}"`,
        'process.env.API_DELETE_DATA': `"${buildEnv.API_DELETE_DATA}"`,
        'process.env.API_EVENTS_URLS': `"${buildEnv.API_EVENTS_URLS}"`,
        'process.env.API_PROOF_CONSENT_URLS': `"${buildEnv.API_PROOF_CONSENT_URLS}"`,
        'process.env.API_REGISTER_IP_FINGERPRINT_URLS': `"${buildEnv.API_REGISTER_IP_FINGERPRINT_URLS}"`,
        'process.env.API_STATS_URLS': `"${buildEnv.API_STATS_URLS}"`,
        'process.env.SDK_VERSION': `"${getSdkVersion(buildEnv)}"`,
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
};

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
    plugins: getDefaultPlugins(),
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
    plugins: getDefaultPlugins(),
  },
];

const browserstackSite = {
  root: 'browserstack/site',
  rootFile: 'index.html',
  sdk: 'browserstack_src/js/index.browserstack.mjs',
  init: 'browserstack_src/js/init.browserstack.mjs',
  minify: true,
  templates: ['browserstack.html'],
  templateVar: {
    __NAME__: 'browserstack',
    __COOKIE_WILDCARD__: 'false',
  },
  env: 'test',
};
const sites = [
  browserstackSite,
  {
    ...browserstackSite,
    rootFile: 'index-cookie-wildcard.html',
    templateVar: {
      ...browserstackSite.templateVar,
      __COOKIE_WILDCARD__: 'true',
    },
  },
].flatMap(({ sdk, init, env, root, rootFile, minify, filesToCopy, templates, templateVar }) => {
  const defaultPlugins = getDefaultPlugins({ env });
  const plugins = minify ? [...defaultPlugins, terser()] : defaultPlugins;
  const templatePlugin = templates.map((template) =>
    htmlTemplate({
      template: `browserstack_src/html/${template}`,
      target: `${root}/${rootFile}`,
      attrs: [`id="${CONSTANTS.sdk_script_id}"`, 'data-progids="[109]"', 'async'],
      replaceVars: {
        __SDK_SRC__: './sdk.js',
        ...templateVar,
      },
    })
  );
  const defaultFiles = ['browserstack_src/js/tag.js', 'browserstack_src/html/favicon.svg'];
  const files = filesToCopy ? [...filesToCopy, ...defaultFiles] : defaultFiles;
  const copyPlugin = copy({
    targets: [
      {
        src: files,
        dest: root,
      },
    ],
    verbose: true,
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
