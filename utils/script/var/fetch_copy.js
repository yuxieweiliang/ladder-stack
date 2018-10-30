/*eslint no-console:0, no-empty:0, no-unused-vars:0*/




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
  _init(){
    this.config = {
      root: 'http://localhost:1337/',
      headers: new Headers({
        'x-pass-access': 'fetch'
      })
    };

    this.request = {
      headers: this.config.headers
    };

    console.log(this);
    return this;
  }
  use(task) {
    this.func.set(task.name, task);
  }
  exec(name) {
    const type = getType(name);

    // 判断是否自己调用，如果自己调用了，就直接返回
    if(this.used && !name) {
      return;
    }
    // 如果自己调用，则关闭程序内部默认的全部调用
    if(type !== 'undefined') {
      this.used = true;
    }

    // 公共的调用方法
    function funcs(item) {
      const _func = this.func.get(item);
      if(getType(_func) !== 'undefined') {
        _func(this);
      } else {
        console.error(item + ' isn’t a function');
      }
    }

    // 如果是字符串
    if(type === 'string') {
      funcs.call(this, name);

    } else if(type == 'array') {

      // 如果是数组，就调用数组中有的
      name.map((item) => funcs.call(this, item));

    } else if(type === 'undefined') {

      // 如果没有穿，就全部调用
      for(let [, func] of this.func.entries()) {
        func(this);
      }
    } else {
      // 其他的就直接报错了。
      console.error('argument must be a string or array');
    }
  }
  get(url) {
    this.method = 'GET';
    console.log('GET');
    return _fetch.call(this, url);
  }
  post(url, params) {
    this.method = 'POST';
    console.log('POST');
    this.body = params;
    return _fetch.call(this, url);
  }
  put(url, params) {
    this.method = 'PUT';
    console.log('PUT');
    this.body = params;
    return _fetch.call(this, url);
  }
  delete(url) {
    this.method = 'DELETE';
    console.log('DELETE');
    return _fetch.call(this, url);
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
}
const iFetch = new InitFetch();



function _createRequest({ headers, method, body }) {
  const request = { headers, method };
  if(body) request.body = JSON.stringify(body);
  return request;
}

// 定义fetch
function _fetch(url) {
  const _this = this;
  return new Promise(function(resolve, reject) {

    _this.request = _createRequest(_this);

    iFetch.exec();


    console.log(_this.request);
    // 请求之前
    _this.start(false);
    return fetch(url, _this.request)
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
      _this.load(true);
      return this.process(response);
    })
    .catch(error => {
      console.error(error);
      return this.error(error);
    });
}

export default iFetch;




iFetch.put('http://localhost:1337/user/update', {userName: 'zhul', passWord: 'zz'})
  .then(res => console.log(res)).catch(err => console.log(err));



//   console.log("Key: %s, Value: %s", key, value);





