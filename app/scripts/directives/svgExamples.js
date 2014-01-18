'use strict';

angular.module('radialMenuApp')
  .directive('svgExamples', function () {
    return {
      templateUrl: 'views/svgExamples.html',
      restrict: 'E',
      link: function postLink() {
      }
    };
  });
