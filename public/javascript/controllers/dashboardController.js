angular.module('app')
.controller('dashboardController',function($scope,$http){
  $scope.articles = [
    {
      title:'New League',
      body:'There is a new league',
      createdBy:'Kyle Walter',
      dateCreated:''
    },
    {
      title:'Cards win!',
      body:'Cardinals Beat the Cubs',
      createdBy:'Kyle Walter'
    }
  ];
  $scope.newArticle = function(){
    $http.post('/api/article',{})
      .success(function(){
        $scope.message = '';
      })
      .error(function(err){
        console.log(err);
      });
  };
  $scope.init = function(){
    $http.get('/api/article')
      .success(function(data){
        $scope.articles = data;
      })
      .error(function(err){

      });
  };
  var socket = io('/');
  socket.on('updateArticles', function (data) {
    $scope.articles.push(data);
    $scope.$apply();
  });
});
