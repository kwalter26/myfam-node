
angular.module('app', [])
  .controller('main',function($scope){
    $scope.messages = '';
    $scope.message = 'uh oh';
    $scope.addMessage = function(){


    }

  var socket = io('//localhost:3000');
  socket.on('socketToMe', function (data) {
    $scope.messages += ('<' + new Date().toLocaleTimeString() + '> '+ data + '\n');
  });
})
