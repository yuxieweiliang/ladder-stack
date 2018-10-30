/* global process __dirname*/

const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
// 分离css
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 清理
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 消除 require函数差异性
const IsomorphicPlugin = require('webpack-isomorphic/plugin');
// 资源链接
const SaveAssetsJson = require('assets-webpack-plugin');
// 用指定浏览器打开项目视图
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
// nodeJs执行环境
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}
const NODE_ENV = (process.env.NODE_ENV).toString().trim();
// 项目根目录,请确保命令在根目录执行 sails-webpack2
const ROOTS = process.cwd();
// 测试根目录
const outputs = path.resolve(path.normalize(`${ROOTS}/.tmp/public/`));

module.exports.webpack = {
  options: {
    // context: path.resolve('../assets'),
    resolve: {
      extensions: ['.scss', '.js', '.jsx', '.htm', '.json', '.html', '.es6'],
      modules: ['node_modules'],
      alias: {
        image: 'E:/01_work/01_kangen/common/units/src/img/',
        script: 'E:/01_work/01_kangen/common/units/src/script/',
        units: 'E:/01_work/01_kangen/common/units/src/units/',
        styles: 'E:/01_work/01_kangen/common/units/src/styles/',
        assets: 'E:/01_work/01_kangen/common/assets/src/bin/',
      }
    },

    // 全局 公用 libs
    entry: {
      login: `${ROOTS}/assets/login.jsx`,
      header: `${ROOTS}/assets/headerView.jsx`,
      indexList: `${ROOTS}/assets/indexList.jsx`,
      ask: `${ROOTS}/assets/ask.jsx`,
      vendors: ['react', 'react-dom', 'prop-types', 'moment']
    },

    // 输出
    output: {
      filename: '[name].js',
      path: outputs,
      publicPath: outputs,
      sourceMapFilename: '[name].map'
    },

    module: {
      rules: [

        // 处理 js,es6 / jsx
        {
          test: /\.(js|es6|jsx)$/,
          use: ['react-hot-loader', 'babel-loader', 'eslint-loader'],
          exclude: /node_modules/
        },

        // 处理 json
        {
          test: /\.json$/,
          use: 'json-loader'
        },

        // 处理 css
        {
          test: /\.css$/,
          use: ['style-loader','css-loader','postcss-loader']
        },
        // 处理scss
        {
          test: /\.scss$/,
          use: ['style-loader','css-loader','postcss-loader','sass-loader']
        },

        // 处理图片
        {
          test: /\.(jpg|png|jpeg|gif)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 3048,
              name: '[name].[ext]'
            }
          }]
        },

        // 处理字体文件
        {
          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 3048,
              name: '[name].[ext]'
            }
          }]
        },
        {
          test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              limit: 3048,
              name: '[name].[ext]'
            }
          }]
        },

        // 处理视频与音频文件
        {
          test: /\.(mpeg|mp4|webm|ogv|wav|mp3|flv)$/,
          use: 'file-loader'
        }
      ]
    },
    /*externals: {
      react: 'React',
      reactDom: 'ReactDOM',
      propTypes: 'prop-types'
    },*/
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDom: 'react-dom',
        PropTypes: 'prop-types',
        ReactServer: 'react-dom/server',
        moment: 'moment',
      }),

      // 消除前后端 require 差异
      new IsomorphicPlugin({
        extensions: ['jpg', 'png', 'gif', 'css']
      }),

      // 缓存链接
      new SaveAssetsJson({
        path: process.cwd(),
        filename: 'assets.json',
        fullPath: false,
        includeManifest: 'manifest'
      }),
      new CleanWebpackPlugin(['.tmp/public/'], {
        verbose: true,
        dry: false,
      }),
      // 开启调试模式
      new webpack.LoaderOptionsPlugin({
        debug: true
      }),
      // 抽取公用脚本
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendors'],
        filename: 'vendors.js',
        minChunks: Infinity,
      }),
      //  热替换
      new webpack.HotModuleReplacementPlugin(),
      // js 压缩
      /*new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })*/
    ]
  },

  // 监听配置
  watchOptions: {
    aggregateTimeout: 300
  }
};