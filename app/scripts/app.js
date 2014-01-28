'use strict';

angular.module('radialMenuApp', [
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/axes', {
        templateUrl: 'views/axes-page.html',
      })
      .when('/scaled-bar-chart', {
        templateUrl: 'views/scaled-bar-chart-page.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
