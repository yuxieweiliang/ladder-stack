import _ from 'lodash'
import 'whatwg-fetch'
import { toLowKey } from '../method'


class KN {
  constructor() {}
  root = 'http://localhost:3000/'
  creatUrl({url, option}) {
    let _url = url + '?'
    if(typeof option !== 'undefined') {
      _.each(option, (opt, key) => {
        //   console.log(option)
        _url += key + '=' + opt + '&'
      })
      return _url.substring(0, _url.length-1)
    } else {
      return url
    }
  }
  fetch (option) {

    // console.log(this.creatUrl(option))
    return fetch(this.creatUrl(option))
      .then((response) => response.json())
      .then((response) => response)
  }
//     "text/plain"  'multipart/form-data'   "application/x-www-form-urlencoded; charset=UTF-8"
  post ({url, option}, data) {
    const myHeaders = new Headers({"Content-Type": "text/plain"});
    const myInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data)
    }
    // console.log(url)
    url = this.creatUrl({url, option})

    return fetch(url, myInit)
      .then((response) => response.json())
  }


  cookie(name, value, options) {
    if (typeof value !== 'undefined') {
      options = options || {};
      //如果值为null, 删除cookie
      if (value === null) {
        value = '';
        options = {
          expires: -1
        };
      }
      //设置有效期
      let expires = '';
      if (options.expires && (typeof options.expires === 'number' || options.expires.toGMTString)) {
        let date;
        if (typeof options.expires === 'number') {
          date = new Date();
          date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        } else {
          date = options.expires;
        }
        expires = ';expires=' + date.toGMTString();
      }
      const path = options.path ? ';path=' + (options.path) : '';
      const domain = options.domain ? ';domain=' + (options.domain) : '';
      const secure = options.secure ? ';secure' : '';
      //设置cookie     encodeURIComponent :函数可把字符串作为 URI 组件进行编码。
      document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
      //读取cookie
      if (document.cookie.length > 0) {
        let start = document.cookie.indexOf(name + '=')
        if (start !== -1) {
          start = start + name.length + 1;
          let end = document.cookie.indexOf(';', start);
          if (end === -1){
            end = document.cookie.length;
          }
          //设置cookie     encodeURIComponent : 解码
          return decodeURIComponent(document.cookie.substring(start, end));
        }
      }
      return ''
    }
  }


}

export default new KN()






