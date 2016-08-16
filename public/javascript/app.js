var socket = io('//localhost:3000');
socket.on('socketToMe', function (data) {
  $('.chatroom').append(data + '\n');
});
