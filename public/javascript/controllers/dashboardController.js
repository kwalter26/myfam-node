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
    $http.post('/api/article',$scope.articles[index])
      .success(function(data){
        $scope.articles = data.articles;
      })
      .error(function(err){
        console.log(err);
      });

    $scope.editIndex = -1;
  };
  $scope.isEditing = function(index){
    return index == $scope.editIndex;
  };
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
