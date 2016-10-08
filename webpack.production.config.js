var path = require('path');
var Webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var precss = require('precss')
var atImport = require('postcss-import')
var flexr = require('postcss-flexbugs-fixes');

// Paths
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var outputPath = path.resolve(__dirname, 'dist', 'app-bundle');
var entryPath = path.resolve(__dirname, '_client', 'app.js');

var config = {

  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'eval-source-map',
  entry: entryPath,
  
  output: {
    // We need to give Webpack a path. It does not actually need it,
    // because files are kept in memory in webpack-dev-server, but an
    // error will occur if nothing is specified. We use the assetsPath
    // as that points to where the files will eventually be bundled
    // in production
    path: outputPath,
    filename: 'bundle.js',

    // Everything related to Webpack should go through a assets path,
    // localhost:3000/app-bundle. That makes proxying easier to handle
    publicPath: '/app-bundle/'
  },

  module: {
      loaders: [
        { test: /\.js$/, loaders: ['ng-annotate', 'babel'], exclude: /node_modules/ },
        { test: /\.html$/, loader: 'raw' },
        { test: /\.css$/, loader: 'style!css!postcss' },
        { test: /\.(woff|woff2|eot|ttf|svg)$/, exclude: /node_modules/, loader: 'url-loader?limit=1024&name=assets/fonts/[name].[ext]'},        
        // { test: /\.(jpg|jpeg|gif|png)$/, exclude: /node_modules/, loader:'url-loader?limit=1024&name=assets/img/[name].[ext]'},        
        { test: /\.json$/, loader: 'json' },
      ]
    },

  plugins: [
    new Webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      moment: 'moment',
      toastr: 'toastr',
      _: 'underscore',
      io: 'socket.io-client'
    }),
    // new ExtractTextPlugin("styles.css"),
    new Webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
  ],

  postcss: function() {
    return [
      atImport({ 
        addDependencyTo: Webpack,
        path: ['dist/app-bundle/assets/styles']
      }),
      autoprefixer({ browsers: ['last 10 versions'] }), 
      precss,
      flexr

    ];
  }

};

module.exports = config;
