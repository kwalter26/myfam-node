angular.module('app')
    .controller('membersController',function($scope,$http){
        $scope.users;
        $scope.user;

        $scope.getUsers = function(id){
            $http.get('/api/user/')
                .success(function(users){
                    $scope.users = users;
                })
                .error(function(err){
                });
        };

    });
  