var http = require('http');

http.createServer(function () {
  throw new Error('This will be uncaught')
}).listen(3000)

process.on('uncaughtException', function (err) {
  console.error(err);
  process.exit(1); // we exit manually
});
