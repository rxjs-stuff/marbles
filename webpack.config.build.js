const { resolve } = require('path')
const { merge } = require('webpack-merge')

module.exports = merge(require('./webpack.config'), {
  entry: {
    'karma/index': './lib/karma/index.ts',
  },
  mode: 'production',
  devtool: 'source-map',
  output: {
    library: 'RxJsMarbles',
    path: resolve(__dirname, '.dist'),
  },
})
