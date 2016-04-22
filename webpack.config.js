var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var objectAssign = require('object-assign');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');
// require promise polyfill for old node environment
if(typeof Promise === 'undefined') {
  require('es6-promise').polyfill();
}
var NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development');
var GA_TRACKING_ID = JSON.stringify(process.env.GA_TRACKING_ID || '');
var DEV = Boolean(NODE_ENV === '"development"');
var developFlag = new webpack.DefinePlugin({
  'process.env.NODE_ENV': NODE_ENV,
  'process.env.GA_TRACKING_ID': GA_TRACKING_ID
});
var listOfPlugins = [];
//uglify js if production build
var uglifierOptions = {
  minimize: true, mangle: {
    except: ['exports', 'require']
  }
};
if (!DEV) {
  listOfPlugins.push(new webpack.optimize.UglifyJsPlugin(uglifierOptions));
}

var commonConfigs = {
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.tsx', '.js', '.ts', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!!postcss-loader')
      },
      {
        test: /\.ts(x)?$/,
        exclude: /(node_modules|__tests__)/,
        loaders: ['ts-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader?mimetype=image/limit=10000'
      }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
  imagemin: {
    gifsicle: { interlaced: false },
    jpegtran: {
      progressive: true,
      arithmetic: false
    },
    optipng: { optimizationLevel: 5 },
    pngquant: {
      floyd: 0.5,
      speed: 2
    },
    svgo: {
      plugins: [
        { removeTitle: true },
        { convertPathData: false }
      ]
    }
  },
  tslint: {
    emitErrors: false
  }
};

module.exports = [
  objectAssign({}, commonConfigs, {
    plugins: listOfPlugins.concat([
      developFlag,
      new ExtractTextPlugin('app.css', {
        allChunks: true
      })
    ]),
    entry: {
      app: path.resolve('src', 'app.tsx')
    },
    output: {
      path: path.resolve(__dirname, 'public', 'dist'),
      filename: '[name].js',
      publicPath: '/public'
    }
  }),
  objectAssign({}, commonConfigs, {
    target: 'node',
    plugins: listOfPlugins.concat([
      developFlag,
      new ExtractTextPlugin('../public/dist/app.css', {
        allChunks: true
      })
    ]),
    entry: {
      vvs: path.resolve('src', 'server.tsx')
    },
    output: {
      path: path.resolve(__dirname, 'private'),
      filename: '[name].js',
      publicPath: '/public/'
    }
  })
];
