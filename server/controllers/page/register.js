import React from 'react'
import ReactServer from 'react-dom/server'
import Register from '../../../src/page/register'

var login = async function(ctx, next) {
  const domRender = ReactServer.renderToString(<Register/>);
  ctx.render('register', {
    css: '/antd/dist/antd.min.css',
    script: '/register/index.build.js',
    domRender: JSON.stringify(domRender)
  })
}
module.exports = {
  'GET /register': login,
};