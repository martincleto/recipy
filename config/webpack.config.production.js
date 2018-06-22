// Webpack configuration for production

'use strict';

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const helpers = require('./helpers');

module.exports = {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'client', 'app'),
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('autoprefixer')(),
              ]
            }
          },
          'sass-loader?sourceMap']
      }
    ]
  },

  optimization: {
    minimizer: [
       new UglifyJsPlugin({
         uglifyOptions: {
           mangle: {
             keep_fnames: true
           }
         }
       })
     ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/styles.[hash].css',
      chunkFilename: "[id].css"
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    })
  ]
};
