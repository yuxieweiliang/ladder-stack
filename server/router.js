import React from 'react'
import Router from 'koa-router'
import ReactServer from 'react-dom/server'
import Input from '../src/page/index'
import {getFilesPath, readDir } from '../assets/func'
const path = require('path');
const fs = require('fs');
const router = new Router();

// { 'GET /book': [Function: get_book],'POST /book': [Function: post_book] }
// { 'GET /hello/:name': [Function: fn_hello] }
function addMapping(router, mapping) {
  console.log('method', mapping);
  // var files = fs.readdirSync(mapping);

  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4);
      router.get(path, mapping[url]);

    } else if (url.startsWith('POST ')) {

      let path = url.substring(5);
      router.post(path, mapping[url]);
    } else if (url.startsWith('UPDATE ')) {

      let path = url.substring(7);
      router.put(path, mapping[url]);
    } else if (url.startsWith('DELETE ')) {

      let path = url.substring(7);
      router.del(path, mapping[url]);
    }
  }
}

/**
 * 递归获取制定目录下所有指定类型的页面
 * @param dirs // 指定目录
 * @param type // 指定类型
 * @returns {Array}
 */
function getAllFileOfPath(dirs, type) {
  const files = [];
  const getFiles = (dirs) => {
    const fileDir = fs.readdirSync(dirs);

    fileDir.map(file => {
      if(file.endsWith(type)) {
        files.push(dirs + '/' +  file)
      } else {
        if(!file.endsWith('.md')) {
          getFiles(dirs + '/' + file)
        }
      }
    })
  };
  getFiles(dirs);
  return files;
}

/**
 * 获取所有目录下文件的返回值
 * @param router
 * @param dirs
 */
function addControllers(router, dirs) {
  let apiPath = getAllFileOfPath(dirs, '.js');

  for (let f of apiPath) {
    // console.log(`process controller: ${f}...`);
    let mapping = require(f);
    addMapping(router, mapping);
  }

  /*readDir(dirs).then(files => {
    var js_files = files.filter((f) => {
      return f.endsWith('.js');
    });
    for (var f of js_files) {
      console.log(`process controller: ${apiPath + f}...`);
      let mapping = require(apiPath + f);
      addMapping(router, mapping);
    }
  })*/
}

module.exports = function(dir) {
  const ctrl_dirs = dir || path.join(__dirname, './controllers/')
  addControllers(router, ctrl_dirs)
  return router.routes()
};