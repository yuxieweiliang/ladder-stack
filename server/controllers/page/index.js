import React from 'react'
import ReactServer from 'react-dom/server'
import Input from '../../../src/page/index'


var index = async function(ctx, next) {
  const domRender = ReactServer.renderToString(<Input/>);
  console.log('ffffffffffffffffffffff')
  console.log(domRender)

  ctx.render('index', {
    css: '/antd/dist/antd.min.css',
    script: '/index/index.build.js',
    domRender: JSON.stringify(domRender)
  })
}

module.exports = {
  'GET /': index,
  'GET /index': index,
};