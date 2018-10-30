/* global sails */
// 参数检测
module.exports = function(sails) {


  /**
   * 是否包含需要过滤敏感字符
   * @param {string} str
   * @private
   */
  function hasKeyword(str) {
    let reg = /select|update|delete|exec|count|'|"|=|;|>|<|%/i;
    if (reg.test(str)) {

      return true;
    }
    return false;
  }

  /**
   * 对象是否非空
   */
  function isEmptyObject(obj) {
    // 是对象的时候
    if (require('util').isObject(obj)) {
      for (let key in obj) {

        return false;
      }

      // 返回 true 表示当前对象是一个空对象
      return true;
    }

    // 非对象时，默认认为是非空对象
    return false;
  }

  return {

    /**
     * 参数过滤
     * @param {object} map 参数映射表
     * @param {object} cur 运行时参数
     */
    params: function*(map, cur) {
      let util = require('util');

      if (util.isObject(map) === false) {

        // 映射表不存在
        return '0017';
      }

      // 请求有参数，但是却没有传递
      if (!isEmptyObject(map) && isEmptyObject(cur)) {

        // 需要参数，但客户端没有传递参数
        return '0012';
      }

      // 请求需要参数，但是却没有传递
      if (!isEmptyObject(map) && isEmptyObject(cur)) {

        // 当前action无须参数，请去掉参数
        return '0009';
      }
      let maps = Object.keys(map);
      let curs = Object.keys(cur);

      if (maps.length > curs.length) {

        // 客户端参数传多了
        return '0005';
      } else if (maps.length < curs.length) {

        // 参数传少了
        return '0006';
      }

      for (let key of maps) {

        // todo参数过滤,此处可以自定义规则
        if (curs.indexOf(key) === false) {

          // 实参中不存在预设参数
          return '0007';
        }

        const value = cur[key];
        if (hasKeyword(value)) {

          // 包含了系统关键字
          return '0008';
        }

        const opts = {};
        const mKey = map[key];
        opts[mKey] = value;
        yield opts;
      }
    }
  };
};