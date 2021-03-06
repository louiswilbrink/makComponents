'use strict';

angular.module('makComponents', [
  'ngRoute', 'angular-gestures', 'nvd3ChartDirectives'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/health-and-ammo', {
        templateUrl: 'views/health-and-ammo.html',
        controller: 'HealthAndAmmoCtrl'
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
      .when('/d3-angular-learning', {
        templateUrl: 'views/d3-angular-learning',
        controller: 'D3AngularLearningCtrl'
      })
      .when('/pure-d3', {
        templateUrl: 'views/pure-d3.html',
      })
      .when('/pure-d3-bar-chart', {
        templateUrl: 'views/pure-d3-bar-chart.html',
      })
      .when('/pure-circle-buttons', {
        templateUrl: 'views/pure-circle-buttons.html',
      })
      .when('/d3/ng-d3-circles', {
        templateUrl: 'views/ng-d3-circles.html',
        controller: 'NgD3CirclesCtrl'
      })
      .when('/d3/circles', {
        templateUrl: 'views/svg-circles.html',
      })
      .when('/d3/svg-primer', {
        templateUrl: 'views/svg-primer.html',
      })
      .when('/d3/d3-animations', {
        templateUrl: 'views/d3-animations.html',
      })
      .when('/d3/bar-chart-scaled', {
        templateUrl: 'views/bar-chart-scaled.html',
      })
      .when('/d3/shrinking-circles', {
        templateUrl: 'views/shrinking-circles.html',
      })
      .when('/d3/circle-revolution', {
        templateUrl: 'views/circle-revolution.html',
        controller: 'CircleRevolutionCtrl'
      })
      .when('/the-rack', {
        templateUrl: 'views/the-rack.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });
