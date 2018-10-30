import Koa from 'koa';
import path from 'path';
import React from 'react';
import Pug from 'koa-pug';
import 'babel-polyfill';
import func from '../func'
const webpack = require('webpack');

const webpackMiddleware = require("webpack-koa2-middleware");
const webpackDev  = require('webpack-dev-middleware');
const webpackHot = require('webpack-hot-middleware');
const PassThrough = require('stream').PassThrough;
// import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'


const devConfig = require('../webpack.config.js');
import readMarked from '../docs'
const  serve = require("koa-static");
import router from '../server/router'// 路由
import '../mongodb';

const compiler = webpack(devConfig);

const app = new Koa();




// 使用模板
const pug = new Pug({
  locals: {
    title: 'Koa Demo'
  },
  viewPath: './views/'
});

pug.use(app);

app.use(serve(path.resolve(path.normalize(__dirname + '/../dist')), { extensions: ['js']}));



const devMiddleware = (compiler, opts) => {
  const middleware = webpackDev(compiler, opts);
  return async (ctx, next) => {
    await middleware(ctx.req, {
      end: (content) => {
        ctx.body = content
      },
      setHeader: (name, value) => {
        ctx.set(name, value)
      }
    }, next)
  }
};


app.use(devMiddleware(compiler, {
  publicPath: devConfig.output.publicPath,
  stats: { colors: true },
}));

const hotMiddleware = (compiler, opts) => {
  const middleware = webpackHot(compiler, opts);
  return async (ctx, next) => {
    let stream = new PassThrough();
    ctx.body = stream;
    await middleware(ctx.req, {
      write: stream.write.bind(stream),
      writeHead: (status, headers) => {
        ctx.status = status;
        ctx.set(headers)
      }
    }, next)
  }

};


app.use(hotMiddleware(compiler));



app.use(async (ctx, next) => {
  // const assetsByChunkName = ctx.states.webpackStats.toJson().assetsByChunkName;
  // console.log('ctx.response.status');
  /// console.log(ctx.response.status);
  await next()
});




/**
 * markdown获取 readme文件
 */
// app.use(readMarked);

// logger 当前路由信息
app.use(async  (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  const data = await func.readDir(path.join(__dirname + '/../'));
  console.log(data);
  await next()
});




































// logger 这里进入又给中间件函数
app.use(async  (ctx, next) => {
  // (2) 进入 logger 中间件
  let start = new Date;
  await next();
  // (4) 再次进入 logger 中间件，记录2次通过此中间件「穿越」的时间
  let ms = new Date - start;
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
  // console.log(ctx.request);
});

app.use(router.routes());

app.listen(3000);


