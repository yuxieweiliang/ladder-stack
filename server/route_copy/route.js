import 'babel-polyfill'
import React from 'react'
import Router from 'koa-router'
import Koa from 'koa'
import path from 'path'
import _ from 'lodash'

const app = new Koa();

const router = new Router();

let cwd = process.cwd();
const json = {
  a: 'a',
  b: 'b'
};

const config = {
  'POST /user': 'UserController.create',
  'DELETE /user/:id': 'UserController.destroy',
  'PUT /user/:id': 'UserController.update',
  'GET /user/': 'UserController.find',
  'GET /user/:id': 'UserController.findOne',
};

// api/book/id
// api/new/book
var _path = path.resolve(path.normalize(cwd + '/api'));
app.use(async function(ctx, next) {
  let method = ctx.request.method;
  let url = ctx.request.url;
  if(url.split('/')[1] === 'api') {
    let apiPath = require(_path + '/' + url.split('/')[2]);
    if(method === 'GET') {
      ctx.body = apiPath.get();
      return
    }
  }

  await next()
});

let conf = {
  GET: {},
  PUT: {},
  POST: {},
  DELETE: {}
};

_.each(config, (value, key) => {
  key = key.replace(/[ ]/g," ");
  var arr = key.split(' ');
  conf[arr[0]][arr[1]] = value;
});

console.log(conf);

/**
 * 首页
 */
router.get('/', async function(ctx, next) {
  ctx.body = 'index';
});

/**
 * 文档
 */
router.get('/docs', async function(ctx, next) {
  ctx.body = 'docs';
});

/**
 * 文档
 */
router.get('/api', async function(ctx, next) {
  ctx.body = 'api';
});

/**
 * 书籍
 */
router.get('/book', async function(ctx, next) {
  ctx.render('book', {
    title: 'book',
    data: 'json',
    render: 'reactDom'
  })
});

router.get('/hello/:name', async (ctx, next) => {
  let name = ctx.params.name;
  ctx.body = `<h1>Hello, ${name}!</h1>`;
});

router.get('/docs', async (ctx, next) => {
  ctx.body = '<h1>docs</h1>';
});

router.get('/example', async (ctx, next) => {
  ctx.body = '<h1>example</h1>';
});

router.get('/example', async (ctx, next) => {
  ctx.body = '<h1>example</h1>';
});






app.use(router.routes());

app.listen(3001);


