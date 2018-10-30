/**
 * 用户登录
 */

module.exports = {

    // 请求方式
    method: 'GET',

    // 服务端的action
    action: 'SysAbout/GetLoginToken',

    // 参数映射关系
    map: {

        // 用户名
        username: 'loginname',

        // 密码
        password: 'psw'
    }
};