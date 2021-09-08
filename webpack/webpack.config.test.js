const Path = require('path');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  target: 'web',
  mode: 'production',
  output: {
    chunkFilename: 'js/[name].chunk.js',
  },
  devServer: {
    inline: false,
    hot: false,
    liveReload: false
  },
  plugins: [
    new ESLintPlugin({
      extensions: 'js',
      emitWarning: true,
      files: Path.resolve(__dirname, '../demo'),
    }),
    new ESLintPlugin({
      emitWarning: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        include: Path.resolve(__dirname, '../demo'),
        loader: 'babel-loader',
      }
    ],
  },
});
