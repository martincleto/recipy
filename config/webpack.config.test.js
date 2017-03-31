'use strict';

const webpack = require('webpack');
const helpers = require('./helpers');

module.exports = {
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('./config', 'tsconfig.json') }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'

      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null-loader'
      },
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'client', 'app'),
        loader: 'null-loader'
      },
      {
        test: /\.scss$/,
        include: helpers.root('src', 'client', 'app'),
        loader: 'raw-loader'
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /* /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, */
      /angular(\\|\/)core(\\|\/)@angular/,  // https://github.com/angular/angular/issues/14898
      helpers.root('./src/client'), // location of your src
      {} // a map of your routes
    )
  ],

  resolve: {
    extensions: ['.ts', '.js']
  }
}
