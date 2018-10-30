const fs = require('fs');
// const fs = require('fs');
const path = require('path');
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
 * 同步
 * 读取文件内容
 * @param fileName
 * @param format
 * @returns {Promise}
 */
let readFile = function (fileName, format) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, format, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

/**
 * 同步
 * 一次获取一个文件夹
 * @param pathName -> 路径
 * @returns {Promise}
 */
let readDir = function (pathName) {
  return new Promise(function(resolve, reject) {
    fs.readdir(pathName, function (err, files) {
      if (err) return reject(err);
      resolve(files);
    });
  })
};

/**
 * 同步
 * 一次获取多个文件夹
 * @param pathName -> 路径的列表
 * @returns {Promise.<*>}
 */
let getFilesPath = function(pathName) {
  const read = pathName.map(item => readDir(item));
  return Promise.all(read)
};

/**
 * 获取元素的绝对位置
 * @param element
 * @returns {{left: (number|Number), top: (Number|number)}}
 */
let getOffset = function(element) {
  var actualLeft = element.offsetLeft;
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return {
    left: actualLeft,
    top: actualTop
  }
};

module.exports = {
  typeOf,
  readFile,
  readDir,
  getFilesPath,
  getOffset,
};