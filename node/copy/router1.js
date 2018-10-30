// import Router from 'koa-router'
const router = require('koa-router');
const Input = require('./input');
const React = require('react');


// const router = new Router();
const ReactServer = require('react-dom/server');

const json = {
  a: 'a',
  b: 'b'
};

// 获取首页
router.get('/', async function(ctx, next) {
  const domRender = ReactServer.renderToString(<Input number="fsdafsa"/>);
  ctx.render('index', {
    name: 'name',
    json: JSON.stringify(json),
    domRender: JSON.stringify(domRender)
  })
});

// 获取其他页面
router.get('/docs', async function(ctx, next) {
  ctx.render('docs', {
    title: 'docs',
    data: 'json',
    render: 'reactDom'
  })
});

// 获取其他页面
router.get('/book', async function(ctx, next) {
  ctx.render('book', {
    title: 'book',
    data: 'json',
    render: 'reactDom'
  })
});
module.exports = router;
// export default router;