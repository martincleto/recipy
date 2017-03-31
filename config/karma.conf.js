'use strict';

const webpackConfig = require('./webpack.config.test');

module.exports = function (config) {
  var _config = {
    basePath: '..',

    frameworks: ['jasmine'],

    files: [
      {pattern: 'config/karma-test-shim.js', watched: false}
    ],

    customLaunchers: {
      // chrome setup for travis CI using chromium
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    preprocessors: {
      'config/karma-test-shim.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: false
  };

  config.set(_config);
};
