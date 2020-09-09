// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const PORT = 9876

module.exports = (config) => {
  config.set({
    basePath: '.',
    frameworks: ['mocha'],
    plugins: [
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-mocha'),
      require('karma-mocha-reporter'),
      require('karma-webpack'),
    ],
    files: [
      { pattern: 'test/karma-bundle.ts', watched: false }
    ],

    preprocessors: {
      '**/*': ['webpack'],
    },
    webpack: require('./webpack.config'),
    client: {
      clearContext: false,
    },

    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true,
    },

    reporters: ['mocha'],
    port: PORT,
    colors: true,
    logLevel: 'info',
    autoWatch: true,
    browsers: ['ChromeHeadless'],

    // prevents Chrome error - Refused to execute script from [test url] because
    // its MIME type ('video/mp2t') is not executable.
    mime: {
      'text/x-typescript': ['ts'],
    },
  })
}
