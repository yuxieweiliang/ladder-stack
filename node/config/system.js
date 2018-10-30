/**
 * 系统配置
 */

module.exports.system = {

    // 名称
    name: '',

    // 域名
    domain: '',

    // 简称
    shrotName: '',

    // 服务器ip
    ip: '127.0.0.1',

    // 权限归属
    copyright: '',

    // 自身配置
    options: {

        // session secret
        secret: '康恩电子',

        // 定义api的访问方式,目前约定fetch访问方式
        passage: 'x-pass-access:fetch',

        // 试图的调用方式
        veiwAuth: ''

    },

    // 站点配置
    siteConfig: {

    }
};