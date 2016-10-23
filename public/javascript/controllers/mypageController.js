angular.module('app')
    .controller('mypageController',function($scope,$http){
        $scope.user = {};

        $scope.getUser = function(id){
            $http.get('/api/user/_id/' + id)
                .success(function(user){
                    $scope.user = user;
                })
                .error(function(err){
                });
        }
        
    });