/**
 * Module dependencies.
 */

var express = require('express')
  , sio = require('socket.io')
  , http = require('http')

/**
 * Create app.
 */

app = express();

app.use(express.bodyParser());
app.use(express.static('public'));

/**
 * Server.
 */

var server = http.createServer(app);

/**
 * Listen.
 */

server.listen(3000);

var io = sio.listen(server);

io.sockets.on('connection', function (socket) {
  socket.on('join', function (name) {
    socket.nickname = name;
    socket.broadcast.emit('announcement', name + ' joined the chat.');
  });

  socket.on('text', function (msg, fn) {
    socket.broadcast.emit('text', socket.nickname, msg);
    fn(Date.now());
  });
});
