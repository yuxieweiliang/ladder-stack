import React from 'react'
import ReactServer from 'react-dom/server'
import BookNew from '../../../src/page/bookNew'
import BookList from '../../../src/page/bookList'
import BookDetailed from '../../../src/page/bookDetailed'
import 'isomorphic-fetch'

import { typeOf } from "../../../assets/method/index";

let createStylesheet = function(style) {
  let stylesheet = [
    '/antd/dist/antd.min.css',
    '/bootstrap-3.3.7-dist/css/bootstrap.min.css'
  ]
  if(style) {
    stylesheet.push(style)
  }
  return stylesheet
}

//

async function getAll() {
  return fetch('http://47.94.97.210:8001/Doctor/getAllPatsInHospital?token=7B65041B62361D3AE4F5603EDF214FE5E1A08A5A0EDCFFCB07C98DD8AE3DC052&Dept_Code=53')
    .then(res => res.json())
}

/**
 * 新建一本书
 */
const bookNew = async function(ctx) {
  let data = await getAll();
  const domRender = ReactServer.renderToString(<BookNew patientData={data}/>);

  console.log(domRender);
  ctx.render('book', {
    css: createStylesheet('/bookNew/index.css'),
    script: '/bookNew/index.build.js',
    domRender: JSON.stringify(domRender)
  })
}

/**
 * 获取书的列表
 */
const bookList = async function(ctx) {
  const domRender = ReactServer.renderToString(<BookList/>);

  ctx.render('book', {
    css: createStylesheet('/bookList/index.css'),
    script: '/bookList/index.build.js',
    domRender: JSON.stringify(domRender)
  })
}

/**
 * 用id获取书的详情
 */
const bookDetailed = async function(ctx) {
  const id = ctx.params.id*1
  const domRender = ReactServer.renderToString(<BookDetailed/>);

  // 如果不是 number 类型， 则重定向
  if(!id && id !== 0) {
    ctx.redirect('/book');
  }

  ctx.render('book', {
    css: createStylesheet('/bookDetailed/index.css'),
    script: '/bookDetailed/index.build.js',
    domRender: JSON.stringify(domRender)
  })
}

module.exports = {
  'GET /book': bookList,
  'GET /book/new': bookNew,
  'GET /book/:id': bookDetailed,
  'GET /book/setting': bookDetailed,
  'GET /book/setting/role': bookDetailed,
};