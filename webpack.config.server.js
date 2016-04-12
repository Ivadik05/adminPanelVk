var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development');
var DEV = Boolean(NODE_ENV === '"development"');
var developFlag = new webpack.DefinePlugin({
  'process.env.NODE_ENV': NODE_ENV
});

var listOfPlugins = [
  developFlag,
  new ExtractTextPlugin('app.css', {
    allChunks: true
  })
];

//uglify js if production build
var uglifierOptions = {
  minimize: true, mangle: {
    except: ['exports', 'require']
  }
};
if (!DEV) {
  listOfPlugins.push(new webpack.optimize.UglifyJsPlugin(uglifierOptions));
}

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
  plugins: listOfPlugins,
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!autoprefixer-loader')
      },
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
