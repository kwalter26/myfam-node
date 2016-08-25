angular.module('app')
.controller('dashboardController',function($scope,$http){
  $scope.editIndex = -1;

  $scope.articles = [

  ];
  $scope.edit = function(index){
    if(index == -1){
      $scope.articles.unshift({
        title:'',
        body:''
      });
      $scope.editIndex = 0;
    }else{
      $scope.editIndex = index;
    }
  };
  $scope.save = function(index){
    console.log();
    $http.post('/api/article/' + $scope.articles[index]._id,$scope.articles[index])
      .success(function(data){
        console.log(data);
        $scope.articles = data;
      })
      .error(function(err){
        console.log(err);
      });

    $scope.editIndex = -1;
  };
  $scope.isEditing = function(index){
    return index == $scope.editIndex;
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
