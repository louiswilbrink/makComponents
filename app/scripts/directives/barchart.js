'use strict';

angular.module('radialMenuApp')
  .directive('barChart', function () {
    return {
      templateUrl: 'views/barchart.html',
      restrict: 'E',
      controller: function () {

        var dataset = [];
        var color = d3.scale.category10();

        var drawData = function () {

          // Bar chart

          var rectsWidth = 500,
              rectsHeight = 250,
              barPadding = 1,
              barChartScale = 2;

          var svgRects = d3.select('.bar-chart')
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

          // Circles
          
          var circlesWidth = 500,
              circlesHeight = 200;

          var svgCircles = d3.select('.bar-chart')
            .select('.sandbox')
            .append('svg')
              .attr('width', circlesWidth)
              .attr('height', circlesHeight)

          var circles = svgCircles.selectAll('circle')
            .data(dataset.entities)
            .enter()
              .append('circle')

          circles.attr('cx', function (d, i) {
                return (i * 70) + 70;
              })
              .attr('cy', circlesHeight/2)
              .attr('r', function (d) {
                return d.ammunitionAmount / 2.5;
              })
              .attr("fill", function(d, i) {
                  return color(i);
              })
        };

        d3.json("dataset.json", function (json) {
          dataset = json;
          drawData(dataset);
        });
      }
    };
  });
