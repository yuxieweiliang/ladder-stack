import React from 'react'
import Router from 'koa-router'
import ReactServer from 'react-dom/server'
import Input from '../src/page/index'
import BookPage from '../src/page/book'

const router = new Router();


const json = {
  a: 'a',
  b: 'b'
};

/**
 * 首页
 */
router.get('/', async function(ctx, next) {
  const domRender = ReactServer.renderToString(<Input/>);
  ctx.render('index', {
    script: '/home/index.build.js',
    name: 'name',
    json: JSON.stringify(json),
    table: JSON.stringify(ctx.macked),
    domRender: JSON.stringify(domRender)
  })
});




/**
 * 首页
 */
router.get('/save', async function(ctx, next) {
  const domRender = ReactServer.renderToString(<Input number="fsdafsa"/>);
  ctx.body = domRender;
});

/**
 * 文档
 */
router.get('/docs', async function(ctx, next) {
  ctx.body = ctx.macked;
});


/**
 * 书籍
 */
router.get('/book', async function(ctx, next) {
  const domRender = ReactServer.renderToString(<BookPage/>);
  ctx.render('book', {
    script: '/book/index.build.js',
    title: 'book',
    data: 'json',
    render: 'reactDom',
    domRender: JSON.stringify(domRender)
  })
});

router.post('/book-length', async(ctx, next) => {

  console.log("-----------body-----",ctx.request);

  ctx.body = JSON.stringify({abc: 'Hello World'});

  // 发送到页面
  // return  await ctx.render('index')
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


module.exports = router;