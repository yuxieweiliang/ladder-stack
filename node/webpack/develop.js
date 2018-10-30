// 前置 webpack 以及 相关插件
const webpack = require('webpack');
const OpenBrowserPlugin = require('open-browser-webpack-plugin'); // 打开指定浏览器
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 分离css

module.exports = function() {
  return {

    devtool: 'inline-source-map',

    module: {
      rules: [

        // 处理 css
        {
          test: /\.css$/,

          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [
                    require('postcss-import')()
                  ]
                }
              }
            ]
          }),
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
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'sass-loader']
          })
        },

        // 处理图片
        {
          test: /\.(jpg|png|jpeg|gif)$/,
          use: 'url-loader'
        },

        // 处理字体文件
        {
          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          use: 'url-loader'
        },
        {
          test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
          use: 'file-loader'
        }

      ]
    },
    plugins: [

      // 开启调试模式
      new webpack.LoaderOptionsPlugin({
        debug: true
      }),

      new ExtractTextPlugin('css/[name].css'),
      //  热替换
      new webpack.HotModuleReplacementPlugin(),

      // 启动之后用指定浏览器自动打开
      new OpenBrowserPlugin({
        url: 'http://localhost:8088/',
        delay: 500,
        browser: 'Chrome'
      })
    ]
  };
};