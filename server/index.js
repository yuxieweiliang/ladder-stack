// import 'babel-polyfill'
import Koa from 'koa'
import path from 'path'
import React from 'react'
// import func from '../func'
import staticServe from 'koa-static'
import koaBody from 'koa-body'
import containers from './router'// 路由
import '../mongodb';
import readMarked from '../docs'
import templatePug from './pug'
import koaWebpack from './koa-webpack'
import logger from './logger'

const app = new Koa();

const option = {
  // maxage: 5000,
  extensions: ['css', 'js', 'html', 'woff', 'jpg', 'png', 'gif']
}

app.use(staticServe(path.resolve(path.normalize(__dirname + '/../dist'))/*, { extensions: ['js', 'css']}*/));
app.use(staticServe(path.resolve(path.normalize(__dirname + '/../public'))));
app.use(staticServe(path.resolve(path.normalize(__dirname + '/../node_modules'))));

// 使用webpack编译前端项目
koaWebpack(app);

// 模板使用pug
templatePug(app);

// markdown获取 readme文件
app.use(readMarked);

// logger 当前路由信息
app.use(logger);

app.use(async function(ctx, next) {
  // 解决跨域问题/如果是*，表示所有网站都可以访问
  ctx.set("Access-Control-Allow-Origin", ctx.request.header.origin)
  // 是否携带证书文件，包含cookie，但是当设置为true时，origin不能为 *
  ctx.set("Access-Control-Allow-Credentials", true);

  // 设置缓存的时间长短为一天
  ctx.set("Access-Control-Max-Age", 86400000);
  // 所支持的请求类型
  ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");
  // 必须包含的头部信息
  ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");
  // 输出的数据类型
  ctx.set("Content-Type", "application/json");

  if (ctx.request.method === 'OPTIONS') {
    ctx.response.status = 200
  }
  await next()
})

app.use(koaBody());

app.use(containers());

app.listen(3000);


