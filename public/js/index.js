var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});
socket.on('disconnect', function () {
    console.log('disconnected from server');
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
        text: jQuery('[name=message]').val()
    }, function () {
        
    });
});