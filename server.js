var express = require('express');

var app = express();


var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var usercount = 0;

io.on('connection', function (socket) {
        usercount++;
        console.log('Client connected - Users connected', usercount);
        io.emit('users_count', 'Users Connected:' + usercount);

    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', function(message){
    usercount--;
    console.log('Client disconnected - Users connected', usercount);
     io.emit('users_count', 'Users Connected:' + usercount);
  });

//   socket.on('typing', function(message){
//       io.emit("isTyping", message)
//   })

});

app.use(express.static('public'));
server.listen(process.env.PORT || 8080);