$(document).ready(function () {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');

    var username = prompt('What is your nickname');

    var addMessage = function (message) {
        if (typeof message == 'object') {
            messages.append('<div>' + message.username + ":" + " " + message.message + '</div>');
        } else {
            messages.append('<div>' + username + ":" + " " + message + '</div>');
        }
    };

    // Show typing
    // var typing = false;
    // var timeout = undefined;

    // function timeoutFunction() {
    //     typing = false;
    //     socket.emit("isTyping", false);
    // }

    // input.on('keypress', function (event) {
    //     if (event.keyCode != 13) {
    //         if (typing === false) {
    //             typing = true;
    //             socket.emit("isTyping", true);
    //         } else {
    //             clearTimeout(timeout);
    //             timeout = setTimeout(timeoutFunction, 50000);
    //         }
    //     }
    //     var message = 'is typing...';
    //     addMessage(message);
    //     socket.emit('message', message.message)
    // });



    //Enter & show message
    input.on('keydown', function (event) {
        if (event.keyCode != 13) {
            return;
        };

        var message = input.val();
        addMessage(message);
        socket.emit('message', { username: username, message: message });
        input.val('');
    });


    //Defining sent

    // socket.on('typing', function () {
    //     socket.on('isTyping', addMessage);
    // });
    socket.on('message', addMessage);
    socket.on('connect', function () {
        socket.on('users_count', addMessage);
    });
});
