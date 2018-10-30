/* global process __dirname*/

const webpack = require('webpack');
const {rules} = require('./env/rules');

//处理html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 项目根目录,请确保命令在根目录执行 sails-webpack2
const ROOTS = process.cwd();

const entryPath = ROOTS + '/staticPage/setting/'
const page = [
  'alert',
  'btn',
  'input',
  'layout',
  'menu',
  'nav',
  'paging',
  'checkbox',
  'select',
  'steps',
  'table',
  'tabs',
  'tag',
  'timeline',
  'tree',
  'triangle',
  'remind',
  'popup',
  'notification',
  'switch',

]


const config = {
  resolve: {
    extensions: ['.scss', '.js', '.jsx', '.htm', '.json', '.html', '.es6'],
    modules: ['node_modules']
  },

  // 全局 公用 libs
  entry: {
    vendors: ['react', 'react-dom', 'prop-types', 'moment']
  },

  // 输出
  output: {
    filename: '[name].js',
    path: `${ROOTS}/dist/`
  },

  module: { rules },
  plugins: [
    // 抽取公用脚本
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendors'],
      filename: 'vendors.js',
      minChunks: Infinity,
    }),
  ]
};


function createConfig(array) {
  array.map(item => {
    const entry = `${item}/index`
    config.entry[entry] = `${entryPath}/${item}`

    config.plugins.push(new HtmlWebpackPlugin({
      filename: `${item}.html`,
      template: `${entryPath}/main.html`,
      showErrors: true,
      chunks: ['vendors', `${item}/index`]
    }))

  })
}

createConfig(page)


module.exports = config