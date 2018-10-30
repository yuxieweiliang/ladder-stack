import React from 'react'
import ReactServer from 'react-dom/server'
import Input from '../../../src/page/index'

var login = async function(ctx, next) {
  const domRender = ReactServer.renderToString(<Input/>);

  console.log('fffffffffffff');

  ctx.render('login', {
    css: '/antd/dist/antd.min.css',
    script: '/login/index.build.js',
    domRender: JSON.stringify(domRender)
  })
}
module.exports = {
  'GET /login': login,
};