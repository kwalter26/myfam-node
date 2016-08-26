angular.module('app')
.controller('leaguesController',function($scope,$http){
  $scope.leagues = [
    {
      name: 'MYBA',
      manager: 'Kyle Walter',
      location: 'Morton IL',
      status: 'active'
    },
    {
      name: 'PHBA',
      manager: 'Kyle Walter',
      location: 'Peoria Heights IL',
      status: 'active'
    }
  ];
});
