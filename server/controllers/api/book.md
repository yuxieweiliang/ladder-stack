1、 获取 body:
## 用来获取提交  request.body  的数据
## 如果使用了 koa-body 插件，则方法不会调用。
ctx.req.addListener('data', (data) => {
    postdata += data
  }).addListener('end', function() {
    console.log('postdata', postdata);
  })

2、http.createServer:
## ctx.req就是http.createServer中的原始的request