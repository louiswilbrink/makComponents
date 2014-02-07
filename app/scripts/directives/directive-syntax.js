'use strict';

angular.module('makComponents')
  .directive('directiveSyntax', function () {
    return {
      templateUrl: 'views/directive-syntax.html',
      restrict: 'E',
      scope: {
        tag: '=',
        attributeList: '='
      },
      link: function (scope) {

        var color = d3.scale.category10();

        scope.getAttributeColor = function (index) {

          return { 'color': color(index) };

        };
      }
    };
  });
