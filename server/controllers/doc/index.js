
var fn_hello = async (ctx, next) => {
  var name = ctx.params.name;
  ctx.body = JSON.stringify({data: `<h1>Hello, ${name}!</h1>`});
};

module.exports = {
  'GET /doc/index': fn_hello,
  'POST /doc/index': fn_hello
};