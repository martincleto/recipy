// Webpack configuration for development

'use strict';

const webpack = require('webpack');

const helpers = require('./helpers');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'client', 'app'),
        use: [
          'style-loader',
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader', options: {
              plugins: (loader) => [
              require('autoprefixer')(),
              ]
            }
          },
          'sass-loader?sourceMap']
      }
    ]
  },

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
};
