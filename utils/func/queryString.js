
/**
 * 获取URL查询字符串query中参数的值
 * @param  {[String]} key [要查询的参数名]
 * @param  {[String]} href [url或者url查询字符串（推荐）]
 * @return {[String]}     [参数值]
 */
var getQueryValue = function(key, href) {
  href = href || window.location.search;
  var match = href.match(new RegExp('[?&]' + key + '=([^&]*)'));
  return match && match[1] && decodeURIComponent(match[1]) || '';
};