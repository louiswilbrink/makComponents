'use strict';

angular.module('makComponents')
  .directive('scatterPlot', function () {
    return {
      templateUrl: 'views/scatterplot.html',
      restrict: 'E',
      controller: function ($scope) {

        var dataset = [
          [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
          [410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
        ];

        var color = d3.scale.category10();

        var width = 500,
            height = 150;

        var svg = d3.select('.scatter-plot')
          .select('.sandbox')
          .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style("border", "1px solid black")

        var circles = svg.selectAll('circle')
          .data(dataset)
          .enter()
          .append('circle')
            // position
            .attr('cx', function (d) {
              return d[0];
            })
            .attr('cy', function (d) {
              return d[1] + 30;
            })
            // size, color
            .attr('r', function (d) {
              return Math.sqrt(height - d[1]);
            })
            .attr('fill', function (d, i) {
              return color(i);
            })

        var labels = svg.selectAll('text')
          .data(dataset)
          .enter()
          .append('text')
            .attr('x', function (d) {
              return d[0];
            })
            .attr('y', function (d) {
              return d[1] + 30;
            })
            .text(function (d) {
              return d[0] + ', ' + d[1];
            })
              .attr({
                'font-family': 'Fondamento',
                'font-size': '15px',
                'fill': 'red'
              })
      }
    };
  });
