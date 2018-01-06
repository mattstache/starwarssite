const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devServer: {
    proxy: {
          '/api': {
            target: process.env.APP_URL,
            secure: false,
          }
    }
  }
});