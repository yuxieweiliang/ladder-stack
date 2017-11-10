
/**
 * 获取当前值的类型
 * @param obj
 * @param target
 * @returns {*}
 */
let typeOf = function(obj, target) {
  const _obj = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
  if(target) {
    return _obj === target
  }
  return _obj
};


/**
 * 转换小写Key
 * @param option
 * @returns {*}
 */
export const toLowKey = (option) => {
  const obj = {}

  if(typeOf(option, 'string')
    || typeOf(option, 'null')
    || typeOf(option, 'undefined')
    || typeOf(option, 'number')) {
    return option
  } else if(typeOf(option, 'array')) {
    return _.map(option, (val, k) => toLowKey(val))
  } else if(typeOf(option, 'object')) {
    _.each(option, (value, key) => {
      obj[key.toLowerCase()] = toLowKey(value)
    })
    return obj
  }
}

/**
 * 将字符串转换为 base64
 * @param str
 * @returns {string}
 */
export const b64Encode =(str) => {
  return btoa(encodeURIComponent(str)
    .replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode('0x' + p1);
    })
  );
}

/**
 * 将base64转为中文
 * @param str
 * @returns {string}
 */
export const  b64Decode = (str) => {
  // console.log(str)
  return decodeURIComponent(atob(str).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

