var path = require('path');

module.exports = {
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    module: 'empty'
  },
  entry: path.resolve(__dirname, 'src', '/app/index.jsx'),
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/'
  },
  module: {
    loaders: [
      {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
          query: {
              presets: ['react', 'es2015', 'stage-2']
          }
      }
    ]
  }
}