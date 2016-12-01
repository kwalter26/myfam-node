angular.module('app')
    .controller('mypageController',['$scope','$http', 'Upload', function($scope,$http,Upload) {
        $scope.user = {};
        
        $scope.readOnly = true;
        $scope.toggleReadOnly = function(){
            $scope.readOnly = !$scope.readOnly;
        };
        $scope.imgUrl = function(){
            if($scope.file){
                console.log($scope.file)
                return $scope.file;
            }
            return $scope.user.imgUrl;
        }

        $scope.newRelation = function(){
            $scope.user.family.push({id:'',relation:''})
        }

        $scope.getUser = function(id){
            $http.get('/api/user/_id/' + id)
                .success(function(user){
                    $scope.user = user;
                })
                .error(function(err){
                });
        };

        $scope.getUsers = function(id){
            $http.get('/api/user/')
                .success(function(users){
                    $scope.users = users;
                })
                .error(function(err){
                });
        };

        $scope.saveUser = function(id){
            $http.post('/api/user/_id/' + id,$scope.user)
                .success(function(user){
                    $scope.user = user;
                    if($scope.file){
                        $scope.upload($scope.file);
                    }
                    $scope.toggleReadOnly();
                    $scope.file = null;
                })
                .error(function(err){
                });
            
        };

        $scope.upload = function (file) {
            Upload.upload({
                url: '/api/user/upload/',
                data: {file: file}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                console.log(resp.data)
                $scope.user.imgUrl = resp.data;
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };


        
        
    }]);