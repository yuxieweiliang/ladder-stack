import queryString from 'query-string'
module.exports = function getParams(url) {
  var params = null;
  if(url.indexOf('?') > -1) {
    var urlParams = url.split('?')[1]
    params = queryString.parse(urlParams)
  }
  return params;
}