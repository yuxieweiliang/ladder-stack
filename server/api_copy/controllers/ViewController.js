/**
 * ViewController
 *
 * @description :: Server-side logic for managing views
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/* global ViewServices sails */

require('es6-promise').polyfill();
let fetch = require('isomorphic-fetch');
let co = require('co');
let root = 'http://113.200.60.140:8010/';
let token = 'token=68ED1D3EC0AA0B91DCF85D080BDA78F9E0AA7C8D4C96C20CA2AE00A342726CBA';

module.exports = {

  // 用户登录之后的首页
  home: (req, res) => {

    let name = 'home'; // 视图名称
    let opts = ViewServices.match('indexList'); // 视图配置

    res.view(name, opts);

  },

  // 登录试图
  login: (req, res) => {
    let name = 'login'; // 视图名称
    let opts = ViewServices.match('login'); // 视图配置

    res.view(name, opts);
  },

  // 登录试图
  ask: (req, res) => {
    let name = 'ask'; // 视图名称
    // 这里调用的是  api/services/ViewServices
    let opts = ViewServices.match(name); // 视图配置

    let askList = req.fetch('doctorAsk').catch(err => console.log(err));
    askList.then(res => res);

    res.view(name, opts);
  }
};