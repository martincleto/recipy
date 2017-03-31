'use strict';

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const helpers = require('./config/helpers');
const env = process.env.NODE_ENV || 'development';

// Common config

let baseConfig = {

  entry: {
    'polyfills': './src/client/polyfills.ts',
    'vendor': './src/client/vendor.ts',
    'app': './src/client/main.ts'
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'client', 'app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap!postcss-loader!sass-loader?sourceMap'
        })
      },
      {
        test: /\.scss$/,
        include: helpers.root('src', 'client', 'app'),
        use: ['to-string-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: helpers.root('./config', 'tsconfig.json')
            }
          }, 'angular2-template-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: 'file-loader?name=assets/images/[name].[hash].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'css/styles.[hash].css',
      allChunks: true
    }),

    new HtmlWebpackPlugin({
      template: 'src/client/index.html',
      favicon: 'src/client/assets/images/favicon.png'
    }),

    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /* /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, */
      /angular(\\|\/)core(\\|\/)@angular/,  // https://github.com/angular/angular/issues/14898
      helpers.root('./src/client'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        context: helpers.root('src', 'client', 'app'),
        postcss: {
          plugins: [autoprefixer]
        }
      }
    })
  ],

  resolve: {
    extensions: ['.ts', '.js']
  },
};

// Config based on environment
let envConfig = require(`./config/webpack.config.${env}.js`);

module.exports = merge(baseConfig, envConfig);
