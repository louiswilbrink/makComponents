'use strict';

angular.module('makComponents', [
  'ngRoute', 'angular-gestures'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/axes', {
        templateUrl: 'views/axes-page.html'
      })
      .when('/scaled-bar-chart', {
        templateUrl: 'views/scaled-bar-chart-page.html'
      })
      .when('/radial-menu', {
        templateUrl: 'views/radial-menu-page.html',
        controller: 'MainCtrl'
      })
      .when('/progress-apps', {
        templateUrl: 'views/progress-apps.html',
        controller: 'MainCtrl'
      })
      .when('/the-rack', {
        templateUrl: 'views/the-rack.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
