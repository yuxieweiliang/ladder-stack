/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/* global User sails */
module.exports = {

  // 用户注册、创建
  create: function(req, res) {},

  // 用户登录
  update: function(req, res) {},

  // 用户退出
  destroy: function(req, res) {},

  // 用户查询
  find: function(req, res) {
    const co = require('co');
    co(function* () {
      // 如果用户登录成功，则返回用户信息
      const userInfo = yield res.fetch('userInfo');

      if(userInfo['State'] === 1) {
        // sails.log.debug(userInfo);

        /**
         * 请求成功时 state=1, data就是 api_key
         * 此时需要保存api_key，客户端生成新的密钥
         * 返回用户信息
         */
        res.freeError([userInfo.Data], '00000');
      }
    });
  }
};