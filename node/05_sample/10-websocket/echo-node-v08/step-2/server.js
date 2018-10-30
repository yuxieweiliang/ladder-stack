var express = require('express')
  , wsio = require('websocket.io')
  , http = require('http')

/**
 * Create express app.
 */

var app = express();
var server = http.createServer(app);

/**
 * Attach websocket server.
 */

var ws = wsio.attach(server);

/**
 * Serve our code
 */

app.use(express.static('public'))

/**
 * Listening on connections
 */

ws.on('connection', function (socket) {
  socket.on('message', function (msg) {
    socket.send(msg);
  });
});

/**
 * Listen
 */

server.listen(3000);
