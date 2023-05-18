// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'assets', 'scripts'),
    filename: 'main.js',
    publicPath: '/'
  },
  devServer: {
    liveReload: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, '/'),
    },
    compress: true,
    port: 8880,
    open: true,
  },
};
