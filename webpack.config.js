'use strict';

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
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

  mode: env,

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.scss$/,
        include: helpers.root('src', 'client', 'app'),
        use: [
          'to-string-loader',
          'css-loader?sourceMap',
          {
            loader: 'postcss-loader', options: {
              plugins: (loader) => [
              require('autoprefixer')(),
              ]
            }
          },
          'sass-loader?sourceMap']
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

  optimization: {
    splitChunks: {
      name: true
    }
  },

  plugins: [
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

    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['app', 'vendor', 'polyfills']
    // }),

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
