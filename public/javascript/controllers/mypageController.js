angular.module('app')
    .controller('mypageController',function($scope,$http,$upload){
        $scope.user = {};
        
        $scope.readOnly = true;
        $scope.toggleReadOnly = function(){
            $scope.readOnly = !$scope.readOnly;
        };

        $scope.getUser = function(id){
            $http.get('/api/user/_id/' + id)
                .success(function(user){
                    $scope.user = user;
                })
                .error(function(err){
                });
        };

        $scope.saveUser = function(id){
            $http.post('/api/user/_id/' + id,$scope.user)
                .success(function(user){
                    $scope.user = user;
                    $scope.toggleReadOnly();
                })
                .error(function(err){
                });
        };

        $scope.upload = function(){
            console.log("here")
            $scope.fileSelected = function(files) {
                if (files && files.length) {
                    $scope.file = files[0];
                }
            
                $upload.upload({
                url: '/api/user/upload',
                file: $scope.file
                })
                .success(function(data) {
                console.log(data, 'uploaded');
                });
    };
        };
    });