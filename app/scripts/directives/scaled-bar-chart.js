'use strict';

angular.module('radialMenuApp')
  .directive('scaledBarChart', function () {
    return {
      templateUrl: 'views/scaled-bar-chart.html',
      restrict: 'E',
      controller: ['$scope', 'Util', function ($scope, Util) {

        var dataset = [];
        var color = d3.scale.category10();

        var drawData = function () {

          // Bar chart

          var rectsWidth = 500,
              rectsHeight = 250,
              barPadding = 1,
              barChartScale = 2;

          var svgRects = d3.select('.scaled-bar-chart')
            .select('.sandbox')
            .append('svg')
              .attr('width', rectsWidth)
              .attr('height', rectsHeight)
              .style("border", "1px solid black")

          var rects = svgRects.selectAll('rect')
            .data(dataset.entities)
            .enter()
            .append('rect')
              .attr('x', function (d, i) {
                return i * (rectsWidth / dataset.entities.length);
              })
              .attr('y', function (d) {
                return rectsHeight - (d.ammunitionAmount * barChartScale);
              })
              .attr('width', ((rectsWidth / dataset.entities.length) - barPadding))
              .attr('height', function (d) {
                return d.ammunitionAmount * barChartScale;
              })
              .attr('fill', function (d, i) {
                return color(i);
              })

          var texts = svgRects.selectAll('text')
            .data(dataset.entities)
            .enter()
            .append('text')
              .text(function (d) {
                return d.entityName;
              })
              .attr('x', function (d, i) {
                return i * (rectsWidth / dataset.entities.length) + (rectsWidth / (dataset.entities.length * 2));
              })
              .attr('y', function (d) {
                return rectsHeight - (d.ammunitionAmount * barChartScale) - 4;
              })
              .attr('text-anchor', 'middle')
        };

        d3.json("dataset.json", function (json) {
          dataset = json;
          drawData(dataset);
        });
      }]
    };
  });
