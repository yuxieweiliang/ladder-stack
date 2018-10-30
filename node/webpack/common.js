






//前置webpack以及相关插件
const webpack = require('webpack');

//处理html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取入口文件的
const getEntries = require('../../tool/var/fileList.js');


module.exports = function(projectRoot, env) {

  // 入口起点
  let entries = {
    // 全局 公用 libs
    vender: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'normalize.css',
      'jquery',
      'moment',
      'lodash',
      'font-awesome-loader'
    ]
  };

  // 获取入口文件
  getEntries(`${projectRoot}/src/index.jsx`, (item) => {

    // 以文件夹的名称作为 页面的名称
    let name = item.split('/').splice(-1)[0].split('.')[0];

    // 赋值给入口对象
    entries[name] = item;

  });

  // 处理最终输出的html 页面
  let pages = [];
  let tpl = `${projectRoot}/src/index.html`; // 模板的路径
  let chunks = Object.keys(entries); // 所有的 chunk

  for (let name of chunks) {
    // 当 name 为 公共libs时
    if (name === 'vender') continue;
    // 加载html模板
    let conf = {
      filename: `${name}.html`,
      template: tpl,
      showErrors: true,
      chunks: chunks,
      inject: true
    };

    // 生产环境下，处理页面中的注释 与 空白
    if (env === 'pro') {
      conf['minify'] = {
        removeComments: true,
        collapseWhitespace: true,
      };
    }
    pages.push(new HtmlWebpackPlugin(conf));
  }

  return {

    resolve: {
      extensions: ['.scss', '.js', '.jsx', '.htm', '.json', '.html', '.es6'],
      modules: ['node_modules']
    },
    entry: entries,
    output: {
      filename: 'js/[name].js',
      path: `${projectRoot}/assets/web/`,
      publicPath: '/',
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

        // 处理 html
        {
          test: /\.(htm|html)$/,
          use: 'html-withimg-loader'
        },

        // 处理 json
        {
          test: /\.json$/,
          use: 'json-loader'
        },

        // 处理视频与音频文件
        {
          test: /\.(mpeg|mp4|webm|ogv|wav|mp3|flv)$/,
          use: 'file-loader?limit=4192&name=[path][name].[ext]'
        }
      ]
    },

    plugins: [

      // 全局 React相关
      new webpack.ProvidePlugin({
        'React': 'react',
        'window.React': 'react',

        'jQuery': 'jquery',
        'window.jQuery': 'jquery',

        '$': 'jquery',
        'window.$': 'jquery',

        'ReactDom': 'react-dom',
        'window.ReactDom': 'react-dom',

        'moment': 'moment',
        'window.moment': 'moment',

        '_': 'lodash',
        'window._': 'lodash',

        'Redux': 'redux',
        'window.Redux': 'redux',

        'PropTypes': 'prop-types',
        'window.PropTypes': 'prop-types',

        'ReactRedux': 'react-redux',
        'window.ReactRedux': 'react-redux'
      })

      // 将模版页面的处理 合并到 webpack的插件中
    ].concat(pages)
  };
};