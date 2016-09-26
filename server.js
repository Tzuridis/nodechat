var express = require('express');

var app = express();


var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var users = 0;

var username = "User" + users;

io.on('connection', function (socket) {
        users++;
        console.log('Client connected - Users connected', users);
        io.emit('users_count', 'Users Connected:' + users);

    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', function(){
    users--;
    console.log('Client disconnected - Users connected', users);
     io.emit('users_count', 'Users Connected:' + users);
  });

});

app.use(express.static('public'));
server.listen(process.env.PORT || 8080);
// app.listen(process.env.PORT || 8080);