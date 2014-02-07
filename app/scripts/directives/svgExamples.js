'use strict';

angular.module('makComponents')
  .directive('svgExamples', function () {
    return {
      templateUrl: 'views/svgExamples.html',
      restrict: 'E',
      link: function postLink() {
      }
    };
  });
