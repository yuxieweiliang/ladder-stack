// 前置 webpack 以及 相关插件
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 处理html模板
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 分离css

module.exports = function (projectRoot) {

  return {

    devtool: 'source-map',

    module: {
      rules: [
        // 处理 css
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                minimize: true,
                importLoaders: 1,
              }
            },
              'postcss-loader'
            ]
          })
        },

        // 处理 scss
        {
          test: /\.less/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'less-loader']
          })
        },

        // 处理 scss
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                minimize: true,
                importLoaders: 1,
              }
            },
              'postcss-loader',
              'sass-loader'
            ]
          })
        },

        // 处理图片
        {
          test: /\.(jpg|png|jpeg|gif)$/,
          use: [{
            loader: "url-loader",
            options: {
              limit: 3048,
              name: 'img/[name].[ext]'
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
              name: 'font/[name].[ext]'
            }
          }]
        },
        {
          test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              limit: 3048,
              name: 'font/[name].[ext]'
            }
          }]
        }
      ]
    },

    plugins: [

      // 设置环境变量
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('pro')
        }
      }),

      // 关闭debug模式
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),

      // 抽取公用脚本
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: "js/vendor.js",
        minChunks: Infinity,
      }),

      // js 压缩
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      }),

      // 提取公共样式
      new ExtractTextPlugin('css/[name].css')

    ]
  }
}