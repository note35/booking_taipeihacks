var path = require('path');
var webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// var devconfig = require('./config/config.dev.json');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");
// var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
// var autoprefixer = require('autoprefixer');
// var cssnano = require('cssnano');
// var postcssNested = require('postcss-nested');

module.exports = {
  devtool: 'source-map',
  entry: [
    // 'webpack-hot-middleware/client',
    './src/app/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    // publicPath: 'http://localhost:8001/'
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   CONFIG: JSON.stringify(devconfig),
    // }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src')
      },
      {
        test: /(\.scss|\.css)$/,
        loader: 'style?singleton!css?-autoprefixer&-minimize&sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!postcss!sass'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
    ]
  },
  postcss: [autoprefixer],
  sassLoader: {
    data: '@import "theme/_theme.scss";',
    includePaths: [path.resolve(__dirname, './src/app')]
  },
  // postcss: [postcssNested, autoprefixer],
  resolve: {
      // you can now require('file') instead of require('file.coffee')
      alias:{
        root: __dirname,
        css: path.join(__dirname, 'src/css'),
        imgs: path.join(__dirname, 'src/imgs'),
        app: path.join(__dirname, 'src/app'),
        components: path.join(__dirname, 'src/app/components'),
        containers: path.join(__dirname, 'src/app/containers'),
        theme: path.join(__dirname, 'src/app/theme'),
        actions: path.join(__dirname, 'src/app/actions'),
      },
      extensions: ['', '.js', '.jsx', '.json', '.scss', '.css', '.html', '.sass'],

      modulesDirectories: [
        'node_modules',
        path.resolve(__dirname, './node_modules')
      ]
  }
};