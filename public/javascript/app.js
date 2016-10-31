
angular.module('app',['ngRoute','angularFileUpload'])
  .config(function($routeProvider,$locationProvider){
    $routeProvider
        .when('/',{
           redirectTo : '/dashboard'
        })
        .when('/dashboard',{
            templateUrl : 'partial/dashboard.pug',
            controller : 'dashboardController'
        })
        .when('/events',{
            templateUrl : 'partial/events.pug',
            controller : 'eventsController'
        })
        .when('/members',{
            templateUrl : 'partial/members.pug',
            controller : 'membersController'
        })
        .when('/mypage',{
            templateUrl : 'partial/mypage.pug',
            controller : 'mypageController'
        });
      $locationProvider.html5Mode(true);
  });
