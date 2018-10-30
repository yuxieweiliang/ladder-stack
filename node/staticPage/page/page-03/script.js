// import fetch from '../../../func/fetch'

var template = {
  name: 'table',
  color: 'black',
  list: [{
    key: 'name',
    value: 'unknown',
    sort: 1,
  }]
};

var other = {
  template: {
    type: 'table-list'
  },
  data: [{
    key: 'name',
    value: '小小天地'
  }]
};

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
      root: 'http://192.168.1.110:3000/',
      // root: 'http://113.200.60.140:8010/'
    };

    // headers.append('x-pass-access', 'fetch');
    this.request.headers = headers;

    return this;
  }
  get(url, option) {
    var params = url + '?';
    for (var key in option) {
      params += `${key}:${option[key]}&`
    }
    return this._fetch(params);
  }
  save(url, params) {
    this.method = 'POST';
    this.body = params;
    return this._fetch(url);
  }
  update(url, params) {
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
  }J88
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

const fetchs = new InitFetch();

$(function() {

  var $saveBtn = $('#save');
  $saveBtn.on('click', function(e) {
    var $username = $('#username').val();
    var $sex = $('#sex').val();
    var $age = $('#age').val();
    var $race = $('#race').val();
    console.log('ffffff');
    let options = {
      method: 'GET',
      headers: new Headers({
        'Access-Control-Allow-Origin': '*'
      }),
    };

    //var str = `http://192.168.1.101:3000/save?name=${$username};sex=${$sex};age=${$age};race=${$race}`.toString();
    var option = {
      name: $username,
      sex: $sex,
      age: $age,
      race: $race,
    };
    // console.log(str);
    fetchs.get('save', option)
        .then(function(response) {
          console.log(response);
      return response
    })
  })
});

