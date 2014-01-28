'use strict';

angular.module('radialMenuApp')
  .directive('scales', function () {
    return {
      templateUrl: 'views/scales.html',
      restrict: 'E',
      controller: function ($scope) {

        // Model.
        
        $scope.scales = {
          scaledOutputs : [],
          width : 0
        };

        // Methods.

        var simpleScale = function () {

          var dataset = [ 100, 200, 300, 400, 500 ];

          var minDomain = 100,
              maxDomain = 500,
              minRange = 10,
              maxRange = 350;

          // Create a linear scale.
          var scale = d3.scale.linear()
            .domain([ minDomain, maxDomain ])
            .range([ minRange, maxRange ]);

          // Scale each datum in dataset.
          angular.forEach(dataset, function (value, key) {

            var input = value;
            var scaledOutput = scale(value);

            $scope.scales.scaledOutputs.push([input, scaledOutput]);
          });
        };

        var drawScatterPlot = function () {
          
          $scope.scales.width = 500;
          var height = 300,
              padding = 20;

          var dataset = [
            [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
            [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
            [600, 150]
          ];

          // Create a linear scale for the x axis.
          var xScale = d3.scale.linear()
            .domain([ 0, d3.max(dataset, function (d) {
              return d[0];
            })])
            // Incorporate padding (extra right-padding for labels).
            .range([ padding , $scope.scales.width - (padding * 3)])

          // Create an *inverted* linear scale for the y axis.
          var yScale = d3.scale.linear()
            .domain([ 0, d3.max(dataset, function (d) {
              return d[1];
            })])
            // Inversion (higher y values appear higher on the scatter plot).
            // Incorporate padding.
            .range([ height - padding, padding ])

          // Create a linear scale for circle radius (min 2, max 5).
          var rScale = d3.scale.linear()
            .domain([ 0, d3.max(dataset, function (d) {
              return d[1];
            })])
            .range([ 2, 5 ])

          var color = d3.scale.category10();

          // Create SVG element.
          var svg = d3.select('.scales')
            .select('.sandbox')
            .append('svg')
              .attr('width', $scope.scales.width)
              .attr('height', height)
              .style("border", "1px solid black")

          // Draw circles according to dataset.
          var circles = svg.selectAll('circle')
            .data(dataset)
            .enter()
            .append('circle')
              // Position.
              .attr('cx', function (d) {
                return xScale(d[0]);
              })
              .attr('cy', function (d) {
                return yScale(d[1]);
              })
              // Set scaled radius and color.
              .attr('r', function (d) {
                return rScale(d[1]);
              })
              .attr('fill', function (d, i) {
                return color(i);
              })

          // Draw corresponding labels.
          var labels = svg.selectAll('text')
            .data(dataset)
            .enter()
            .append('text')
              // Position.
              .attr('x', function (d) {
                return xScale(d[0]);
              })
              .attr('y', function (d) {
                return yScale(d[1]);
              })
              // Text, style.
              .text(function (d) {
                return d[0] + ', ' + d[1];
              })
                .attr({
                  'font-family': 'Fondamento',
                  'font-size': '15px',
                  'fill': 'red'
                })
        };

        // Initialization.
       
        simpleScale();
        drawScatterPlot();

        // API.
        
      }
    };
  });
