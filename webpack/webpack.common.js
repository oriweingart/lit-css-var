const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../demo/scripts/index.js'),
  },
  output: {
    path: Path.join(__dirname, '../build'),
    filename: 'js/[name].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  resolve: {
    alias: {
        "lit-css-var": Path.resolve(__dirname, '../index.js'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: Path.resolve(__dirname, '../demo/index.html'),
    }),
  ]
};
