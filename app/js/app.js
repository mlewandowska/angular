'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	.when('/main', {
  			templateUrl: 'partials/main.html', 
  			controller: 'MainCtrl'
  		})
	  	.when('/addvideo', {
  			templateUrl: 'partials/addvideo.html', 
  			controller: 'AddVideoCtrl'
  		})
  	.when('/video/:videoId', {
  			templateUrl: 'partials/video.html', 
  			controller: 'VideoCtrl'
  		})
    .when('/editvideo/:videoId', {
  			templateUrl: 'partials/editvideo.html', 
  			controller: 'EditVideoCtrl'
  		})
  	.otherwise({redirectTo: '/main'});
}]);
