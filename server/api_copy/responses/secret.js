/**
 * 用户密钥，并且使用redis缓存、状态维护
 * @param {string} username 用户名，默认为: admin_root
 * @desc 密钥的组成：用户名 + 用户IP + 用户设备 + 用户本次的登录时间戳
 * @return {object} 返回一组可用的类属性函数
 */

module.exports = function secret(username = 'admin_root') {
    const req = this.req;
    const res = this.res;

    const userIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    const md5 = require('md5');
    return {

        // 生成密钥
        make: function() {

            // 用户登录成功的时刻，以服务器登陆成功的时间为准
            let signinSuccessTime = new Date().getTime();
        },

        // 获取密钥
        obtain: function() {

        },

        // 更新密钥
        update: function() {

        },

        // 删除密钥
        remove: function() {

        },

        // 密钥校验
        checkout: function() {

        },

        // 清空redis中制定用户的所有相关的密钥
        clear: function() {

        },

        // 用户密钥永久保存
        save: function() {

        },

        // 使用 redis 暂存密钥，便实现了用户状态维持
        staging: function() {

        }
    };
};