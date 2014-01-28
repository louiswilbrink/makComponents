'use strict';

angular.module('radialMenuApp')
  .directive('radialMenu', function () {
    return {
      templateUrl: 'views/radial-menu.html',
      restrict: 'E',
      controller: ['$scope', function ($scope) {
      }]
    };
  });
