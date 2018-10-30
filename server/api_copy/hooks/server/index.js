/**
 * 数据库服务器的信息
 */
module.exports = function(sails) {

  let location = {
    // 主机ip
    host: 'http://113.200.60.140',

    // 端口
    port: '8010',

    // 特定前缀
    prefix: '',

    // 密钥名称
    token: {

      // 服务器使用的名称
      name: 'token',

      // 具体的值
      value: '3C345FCF4FDFFF68866D0FBC1A01B1337221B3AA3C3CDC43935668E24A4B33E7'
    }
  };
  return {

    // 获取资源定位
    getURI: (action) => {

      return `${location.host}:${location.port}/${location.prefix}/${action}`;
    },

    // 返回
    getToken: () => {

      return location.token;
    }
  };
};
/*


fetch('index', {key: 'value'}, {
  method: 'GET',
  headers: {
    key: 'value'
  }
});


fetch.config(function(request, response, headers) {

});


*/




















