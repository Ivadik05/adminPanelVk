let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let objectAssign = require('object-assign');
let precss       = require('precss');
let autoprefixer = require('autoprefixer');
// require promise polyfill for old node environment
if(typeof Promise === 'undefined') {
  require('es6-promise').polyfill();
}
let NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development');
let GA_TRACKING_ID = JSON.stringify(process.env.GA_TRACKING_ID || '');
let DEV = Boolean(NODE_ENV === '"development"');
let developFlag = new webpack.DefinePlugin({
  'process.env.NODE_ENV': NODE_ENV,
  'process.env.GA_TRACKING_ID': GA_TRACKING_ID
});
let listOfPlugins = [];
//uglify js if production build
let uglifierOptions = {
  minimize: true, mangle: {
    except: ['exports', 'require']
  }
};
if (!DEV) {
  listOfPlugins.push(new webpack.optimize.UglifyJsPlugin(uglifierOptions));
}

let commonConfigs = {
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.tsx', '.js', '.ts', '.css']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: !DEV,
                importLoaders: 1,
                localIdentName: '[local]__[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|__tests__)/,
        loaders: ['ts-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader?mimetype=image/limit=10000'
      }
    ]
  }
  // postcss: function () {
  //   return [autoprefixer];
  // },
  // imagemin: {
  //   gifsicle: { interlaced: false },
  //   jpegtran: {
  //     progressive: true,
  //     arithmetic: false
  //   },
  //   optipng: { optimizationLevel: 5 },
  //   pngquant: {
  //     floyd: 0.5,
  //     speed: 2
  //   },
  //   svgo: {
  //     plugins: [
  //       { removeTitle: true },
  //       { convertPathData: false }
  //     ]
  //   }
  // },
  // tslint: {
  //   emitErrors: false
  // }
};

module.exports = [
  objectAssign({}, commonConfigs, {
    plugins: listOfPlugins.concat([
      developFlag,
      new ExtractTextPlugin({
        filename: 'app.css',
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
      new ExtractTextPlugin({
        filename: '../public/dist/app.css',
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
