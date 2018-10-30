import React from 'react'
import ReactServer from 'react-dom/server'
import User from '../../../src/page/user'

var user = async function(ctx, next) {
  const domRender = ReactServer.renderToString(<User/>);

  ctx.render('index', {
    css: '/antd/dist/antd.min.css',
    script: '/user/index.build.js',
    domRender: JSON.stringify(domRender)
  })
}
module.exports = {
  'GET /user': user,
};