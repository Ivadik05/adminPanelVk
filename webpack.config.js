let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let objectAssign = require('object-assign');
let precss       = require('precss');
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
  devtool: 'source-map'
};

module.exports = [
  objectAssign({}, commonConfigs, {
    target: 'web',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules|__tests__)/,
          use: ['ts-loader']
        },
        {
          test: /\.css$/,
          // use: [
          //   'style-loader',
          //   {
          //     loader: 'css-loader',
          //     options: {
          //       importLoaders: 1,
          //       modules: true,
          //       camelCase: true,
          //       localIdentName: '[local]__[hash:base64:5]'
          //     }
          //   }
          //   // 'postcss-loader'
          // ]
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                query: {
                  modules: true,
                  camelCase: true,
                  importLoaders: 1,
                  autoprefixer: false,
                  localIdentName: '[local]__[hash:base64:5]'
                }
              }
            ]
          })
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'url-loader?mimetype=image/limit=10000'
        }
      ]
    },
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
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules|__tests__)/,
          use: ['ts-loader']
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'css-loader/locals?modules', // чтобы для server side собирались правильные стили https://github.com/gajus/react-css-modules/issues/83#issuecomment-271265288
              options: {
                importLoaders: 1,
                modules: true,
                camelCase: true,
                localIdentName: '[local]__[hash:base64:5]'
              }
            }
            // 'postcss-loader'
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'url-loader?mimetype=image/limit=10000'
        }
      ]
    },
    plugins: listOfPlugins.concat([
      developFlag
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
