var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var DEV = JSON.parse(process.env.BUILD_DEV || false);
var developFlag = new webpack.DefinePlugin({
  __DEV__: DEV
});

var listOfPlugins = [
    developFlag
];

//uglify js if production build
var uglifierOptions = {minimize: true, mangle: {except: ['exports', 'require']}};
!DEV && listOfPlugins.push(new webpack.optimize.UglifyJsPlugin(uglifierOptions));


module.exports = {
  target: 'node',
  entry: [
    path.resolve('src', 'server.tsx')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
    publicPath: '/dist/'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.tsx', '.js', '.ts', '.css']
  },

  module: {
    loaders: [
      {
        test: /\.ts(x)?$/,
        exclude: /(node_modules|__tests__)/,
        loaders: ['ts-loader']
      }
    ]
  },

  tslint: {
    emitErrors: false
  }
};
