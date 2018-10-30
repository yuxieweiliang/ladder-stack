/* global process __dirname*/

module.exports = {
  rules: [

    // 处理 js,es6 / jsx
    {
      test: /\.(js|es6|jsx)$/,
      use: [/*'react-hot-loader',*/ 'babel-loader'/*, 'eslint-loader'*/],
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
    // 处理 less
    {
      test: /\.less/,
      use: ['style-loader','css-loader','postcss-loader', 'less-loader']
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
};