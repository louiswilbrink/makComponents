'use strict';

angular.module('makComponents')
  .directive('scaledBarChart', function () {
    return {
      templateUrl: 'views/scaled-bar-chart.html',
      restrict: 'E',
      controller: ['$scope', 'Util', function ($scope, Util) {

        // Model.

        var min = 25, max = 900, length = 20;
        var dataset = Util.getArrayOfRandomNumbers(length, min, max);

        var svg, rects, labels, scales, color, width, height, padding;

        // Methods.
        
        var generateScales = function (dataset, width, height, padding) {

          var scales = {};

          // 
          scales.x = d3.scale.ordinal()
            // Generate array of sequential numbers up to the length of dataset.
            .domain(d3.range(dataset.length))
            // Calculate even bands between 0 and width, include a 5% margin between.
            .rangeRoundBands([0, width], 0.05);

          // Create an *inverted* linear scale for the y axis.
          scales.y = d3.scale.linear()
            // Input domain defined as zero to dataset maximum.
            .domain([ min, d3.max(dataset)])
            // Output range is the height of the svg, minus padding.
            .range([ padding, height - padding])

          return scales;
        };

        var drawScatterPlot = function () {

          width = 500
          height = 500;
          padding = 1;

          color = d3.scale.category10();

          scales = generateScales(dataset, width, height, padding);

          svg = d3.select('.scaled-bar-chart')
            .select('.sandbox')
            .append('svg')
              .attr('width', width)
              .attr('height', height)
              .style("border", "1px solid black")

          rects = svg.selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
              .attr('x', function (d, i) {
                return scales.x(i);
              })
              .attr('y', function (d) {
                return height - scales.y(d);
              })
              .attr('width', scales.x.rangeBand())
              .attr('height', function (d) {
                return scales.y(d);
              })
              .attr('fill', function (d, i) {
                return color(i);
              })

          labels = svg.selectAll('text')
            .data(dataset)
            .enter()
            .append('text')
              // Simple display the value.
              .text(function (d) {
                return d;
              })
              // Place label towards the top of the bar, centered.
              .attr('x', function (d, i) {
                return scales.x(i) + (scales.x.rangeBand() / 2);
              })
              .attr('y', function (d) {
                return height - scales.y(d) + 10;
              })
              .attr('text-anchor', 'middle')
              .classed('svg-text', true)
        };
        
        // Initialization.

        drawScatterPlot();

        // API.

        $scope.generateNewDataset = function () {

          dataset = Util.getArrayOfRandomNumbers(length, min, max);

          // Reset the domain input: The highest number in the dataset
          // should reach the top of the chart.
          scales.y.domain([ min, d3.max(dataset)]);

          rects = svg.selectAll('rect')
            .data(dataset)
            .transition()
            .delay(function (d, i) {
              return i / dataset.length * 1000;
            })
            .duration(500)
            // Set new height and y position.
              .attr('y', function (d) {
                return height - scales.y(d);
              })
              .attr('height', function (d) {
                return scales.y(d);
              })

          labels = svg.selectAll('text')
            .data(dataset)
            .transition()
            .delay(function (d, i) {
              return i / dataset.length * 1000;
            })
            .duration(500)
              .text(function (d) {
                return d;
              })
              .attr('y', function (d) {
                return height - scales.y(d) + 10;
              })
        };
      }]
    };
  });
