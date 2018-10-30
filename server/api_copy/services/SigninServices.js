/**
 * 用户的真实登录、缓存api_key
 */
const fetch = require('isomorphic-fetch');
/**
 *
 * @param {object} data 请求需要传递的参数
 * @param {function} next 接收返回值
 */
function signin(data, next) {

  // 参数的默认格式
  let preData = {
    api_key: '',
    loginname: '',
    psw: ''
  };
  // 请求的借口

  // 合并参数

  // 发起请求

  fetch('//offline-news-api.herokuapp.com/stories')
    .then(function (response) {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then(function (stories) {
      console.log(stories);
    });

}

