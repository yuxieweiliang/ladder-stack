/*eslint no-console:0, no-empty:0, no-unused-vars:0*/
import fetch from 'isomorphic-fetch';

function getType(option) {
  return Object.prototype.toString.call(option).slice(8, -1).toLowerCase();
}
class InitFetch {
  constructor() {
    this.func = new Map();
    this.method = 'GET';
    this.config = null;
    this.request = {};
    this.body = null;
    return this._init();
  }
  _init() {
    let headers = new Headers();
    this.config = {
      root: 'http://localhost:1337/',
      // root: 'http://113.200.60.140:8010/'
    };

    headers.append('x-pass-access', 'fetch');
    this.request.headers = headers;

    return this;
  }
  get(url, option) {
    this.method = 'GET';
    return this._fetch(url);
  }
  post(url, params) {
    this.method = 'POST';
    this.body = params;
    return this._fetch(url);
  }
  put(url, params) {
    this.method = 'PUT';
    this.body = params;
    return this._fetch(url);
  }
  delete(url) {
    this.method = 'DELETE';
    return this._fetch(url);
  }
  start() {
    console.log('request is init');
  }
  load() {
    console.log('request is load');
  }
  error(error) {
    return error;
  }
  process(response) {
    return response.json();
  }

  _fetch(url) {
    const _this = this;
    let { config, method, body } = this;
    this.request.method = method;

    if(body) this.request.body = JSON.stringify(body);

    console.log(_this.request);
    return new Promise(function(resolve, reject) {
      // 请求之前
      _this.start(false);
      return fetch(config.root + url, _this.request)

        .catch(error => reject(error))
        .then(response => {
          if(response && response.ok) {
            resolve(response);
          } else {
            reject(response);
          }
        });
    })
      .then(response => {
        _this.body = null;
        _this.request.body = null;
        _this.load(true);
        return this.process(response);
      })
      .catch(error => {
        console.error(error);
        return this.error(error);
      });
  }
}
export default new InitFetch();

//   console.log("Key: %s, Value: %s", key, value);





