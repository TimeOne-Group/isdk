// import fs from 'fs';
// import path from 'path';

import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';
import babelLoaderExcludeNodeModulesExcept from 'babel-loader-exclude-node-modules-except';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import copy from 'rollup-plugin-cpy';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';
import CONSTANTS from './src/constants.mjs';

const banner = {
  banner() {
    return `/*! ${pkg.name} ${pkg.version} https://github.com/${pkg.homepage} @license ${pkg.license} */`;
  },
};

const defaultPlugins = [
  nodeResolve(),
  commonjs(),
  postcss({
    plugins: [],
  }),
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
];

const sites = [
  {
    root: 'docs',
    sdk: 'sites_src/js/index.testsite.mjs',
    init: 'sites_src/js/init.testsite.mjs',
    minify: false,
    templates: ['annonceur.html', 'index.html'],
    filesToCopy: [],
    templateVar: {
      __NAME__: 'demo',
      __SDK_SRC__: './sdk.js', // Change to CDN after first tag https://cdn.jsdelivr.net/gh/TimeOne-Group/isdk@1/docs/sdk.js
    },
  },
  {
    root: 'browserstack/site',
    sdk: 'sites_src/js/index.browserstack.mjs',
    init: 'sites_src/js/init.browserstack.mjs',
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
      template: `sites_src/html/${template}`,
      target: `${root}/${template}`,
      attrs: [`id="${CONSTANTS.sdkScriptId}"`, 'data-progids="[109]"', 'async'],
      replaceVars: {
        __SDK_SRC__: './sdk.js',
        // __NAVIGATION_TEMPLATE__: fs.readFileSync(path.resolve('sites_src/html/navigation.html'), 'utf8'), // TEST TEMPLATING WITH VARIABLES OK
        ...templateVar,
      },
    })
  );
  const defaultFiles = ['sites_src/js/tag.js', 'sites_src/html/favicon.svg'];
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
      input: 'sites_src/js/common.js',
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
