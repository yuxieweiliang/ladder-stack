/**
 * 请求数据
 * @param {object} mmap 请求的model
 */
/* global sails */

module.exports = function(mmap) {
  const util = require('util');

  let req = this.req;
  let res = this.res;
  const middle = sails.hooks.middle.getModelsMap();
  if (!middle.has(mmap)) {

    // 中间件必要的数据模型不存在
    res.freeError('0019');
    return;
  }

  // 获取到当前的映射关系
  const model = middle.get(mmap);
  require('../common/urlsearchparams');
  let form = new URLSearchParams();
  let currParam = req.allParams();
  let param = null;

  // 利用参数过滤器获取所有参数
  if ('map' in model) {
    // 当前中间过程需要参数

    let iter = sails.hooks.filter.params(model['map'], currParam);

    let temp = iter.next();
    if (util.isString(temp.value)) {
      res.freeError(temp.value);
      return;
    }
    for (; !temp.done; temp = iter.next()) {
      let vkey = Object.keys(temp.value)[0];
      form.append(vkey, temp.value[vkey]);

    }
    sails.log.debug('the form', form);
  }


  require('es6-promise').polyfill();
  const fetch = require('isomorphic-fetch');
  let method = model['method'];
  let action = model['action'];
  // 服务器信息
  const server = sails.hooks.server;
  // 请求地址
  let url = server.getURI(action);

  // 持久化 这个密钥
  const token = server.getToken();
  // 默认先加入密钥
  form.append(token.name, token.value);

  // 定义头
  let headers = new Headers();
  let options = {
    method: method,
    headers: headers,
    redirect: 'follow',
    follow: 20,
    timeout: 4000,
    compress: true,
    size: 0,
    agent: null
  };

  // get方式传参
  if (method === 'GET') {
    form = form.toString();
    if (form !== '') {
      url += '?' + form;
    }
  } else {
    options['body'] = JSON.stringify(form);
  }

  sails.log.debug('url', url);
  // 发送请求
  return fetch(url, options).then(function(response) {
    if (response.status >= 400) {
      // 数据服务端错误
      res.freeError('0013');
      return;
    }

    return response.json();
  }).catch(function(error) {

    if (error.type == 'request-timeout') {
      // 连接超时
      res.freeError('0014');
      return;
    }
  });
};