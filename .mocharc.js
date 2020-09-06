const { resolve } = require('path')

module.exports = {
  extension: 'ts',
  require: [
    'tsconfig-paths/register',
    'ts-node/register',
    'ts-custom-error-shim',
    resolve(__dirname, './test/mocha.config'),
  ],
  spec: [
    'lib/**/*.spec.ts',
    'lib/**/index.ts',
  ]
}
