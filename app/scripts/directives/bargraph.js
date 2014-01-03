'use strict';

angular.module('radialMenuApp')
  .directive('barGraph', function () {
    return {
      templateUrl: 'views/barGraph.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        var width = 300;
        var height = 300;

        var dataset = [9, 5, 7, 2];

        var svg = d3.select('bar-graph')
          .append('svg')
            .attr('width', width)
            .attr('height', height);

        svg.selectAll('rect')
            .data(dataset)
          .enter()
          .append('rect')
            .attr('x', function (datum, index) {
              return index * 30;
            })
            .attr("y", 0)
            .attr("width", 20)
            .attr("height", 100);
      }
    };
  });
