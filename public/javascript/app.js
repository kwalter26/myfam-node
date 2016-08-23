
angular.module('app',['ngRoute'])
  .config(function($routeProvider,$locationProvider){
    $routeProvider
        .when('/',{
           redirectTo : '/dashboard'
        })
        .when('/dashboard',{
            templateUrl : 'partial/dashboard.pug',
            controller : 'dashboardController'
        })
        .when('/leagues',{
            templateUrl : 'partial/leagues.pug',
            controller : 'leaguesController'
        });
      $locationProvider.html5Mode(true);
  });
