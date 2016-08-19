
angular.module('app', [])
  .controller('main',function($scope,$http){
    $scope.messages = ['hello'];
    $scope.message = 'uh oh';
    $scope.sendMessage = function(){
      $http.post('/api/article',{message: $scope.message})
        .success(function(){
          $scope.message = '';
        })
        .error(function(err){
          console.log(err);
        });
    }

  var socket = io('/');
  socket.on('postArticle', function (data) {
    console.log('here');
    $scope.messages.push(data);
    $scope.$apply();
  });
})
