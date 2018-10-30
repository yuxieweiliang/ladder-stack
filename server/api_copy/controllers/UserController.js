/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/* global User sails */
const typeOf = (option) => {
  return Object.prototype.toString.call(option).slice(8, -1).toLowerCase()
};
const toLowKey =(option) => {
  if(typeOf(option) === 'string'
    || typeOf(option) === 'null'
    || typeOf(option) === 'undefined'
    || typeOf(option) === 'number') {
    return option
  } else if(typeOf(option) === 'array') {
    return option.map((val, k) => toLowKey(val))
  } else if(typeOf(option) === 'object') {
    const obj = {};
    Object.keys(option).forEach((key) => {
      obj[key.toLowerCase()] = toLowKey(option[key])
    });
    return obj
  }
};

const iFetch = function(option) {
  require('../common/urlsearchparams');
  let form = new URLSearchParams();
  const middle = sails.hooks.middle.getModelsMap();
  // { method: 'GET', action: 'SysAbout/GetHISUserInfo', map: {} }
  let {method, action} = middle.get(option);
  // 服务器信息
  const server = sails.hooks.server;
  // 请求地址
  let url = server.getURI(action);
  // 持久化 这个密钥
  const token = server.getToken();
  // 默认先加入密钥
  form.append(token.name, token.value);
  url += '?' + form;

  let options = {
    method,
    headers: new Headers(),
  };
  return new Promise(function (resolve, reject) {
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        if(res.ok) {
          resolve(res.json())
        } else {
          reject('错误')
        }
      })
      .catch(err => reject('错误'))
  });
};

module.exports = {

  // 用户注册、创建
  create: function(req, res) {

  },

  // 用户登录
  // http://113.200.60.140:8010/SysAbout/GetHISUserInfo
  update: function(req, res) {
    async function userData() {
      const signIn = await res.fetch('signIn');
      if(signIn['State'] === 1) {
        return await iFetch('userInfo').catch(err => console.log('buzhidao'))
      }
    }
    userData()
      .then(response => {
        console.log(response);
        /**
         * 请求成功时 state=1, data就是 api_key
         * 此时需要保存api_key，客户端生成新的密钥
         * 返回用户信息
         */
        if(response['State'] === 1) {
          res.freeError([toLowKey(response.Data)], '00000');
        }
      });

  },

  // 用户退出
  destroy: function(req, res) {

  },

  // 用户查询
  find: function(req, res) {

  }
};