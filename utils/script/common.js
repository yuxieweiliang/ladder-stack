/* eslint no-console: 0  */

class KE {
  constructor() {
  }

  /**
   * 将base64转为中文
   * @param str
   * @returns {string}
   */
  b64DecodeUnicode(str) {
    // console.log(str)
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  /**
   * 将字符串转换为 base64
   * @param str
   * @returns {string}
   */
  b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str)
      .replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode('0x' + p1);
      })
    );
  }
}

class Cookie extends KE {
  constructor() {
    super();
  }
  get(key) {
    const cookie = document.cookie;
    //读取cookie
    if (cookie.length > 0) {
      let start = cookie.indexOf(key + '=');
      if (start != -1) {
        start = start + key.length + 1;
        let end = cookie.indexOf(';', start);
        if (end == -1){
          end = cookie.length;
          return '';
        }
      }
    }
  }
  set(key, value, timer) {
    if (typeof value != 'undefined') {
      //如果值为null, 删除cookie
      if (value === null) {
        console.error('value cannot be null, you can used delete to remove cookie');
      }
      //设置有效期
      let expires = '';
      if (timer && (typeof timer == 'number' || timer.toGMTString)) {
        let date;
        if (typeof timer == 'number') {
          date = new Date();
          date.setTime(date.getTime() + (timer * 24 * 60 * 60 * 1000));
        }
      }
    }
  }
  delete(key) {
    if (typeof key != 'undefined') {
      this.set(key, '', -1);
    } else {
      console.error('key is undefined');
    }
  }
}

export default {
  ke: new KE(),
  cookie: new Cookie()
};






