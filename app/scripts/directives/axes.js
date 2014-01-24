'use strict';

angular.module('radialMenuApp')
  .directive('axes', function () {
    return {
      templateUrl: 'views/axes.html',
      restrict: 'E',
      controller: ['$scope', function ($scope) {

        // Model.
        
        $scope.axes = {
          scaledOutputs : []
        };

        // Methods.
        
        var generateRandomDataset = function () {
          var dataset = [];
          var numDataPoints = 50;
          var xRange = Math.random() * 1000;
          var yRange = Math.random() * 1000;
          for (var i = 0; i < numDataPoints; i++) {
              var newNumber1 = Math.floor(Math.random() * xRange);
              var newNumber2 = Math.floor(Math.random() * yRange);
              dataset.push([newNumber1, newNumber2]);
            }

          return dataset;
        };

        var generateScales = function (dataset, width, height, padding) {

          var scales = {};

          // Create a linear scale for the x axis.
          scales.x = d3.scale.linear()
            .domain([ 0, d3.max(dataset, function (d) {
              return d[0];
            })])
            // Incorporate padding (extra right-padding for labels).
            .range([ padding , width - (padding * 3)])

          // Create an *inverted* linear scale for the y axis.
          scales.y = d3.scale.linear()
            .domain([ 0, d3.max(dataset, function (d) {
              return d[1];
            })])
            // Inversion (higher y values appear higher on the scatter plot).
            // Incorporate padding.
            .range([ height - padding, padding ])

          // Create a linear scale for circle radius (min 2, max 5).
          scales.radius = d3.scale.linear()
            .domain([ 0, d3.max(dataset, function (d) {
              return d[1];
            })])
            .range([ 2, 5 ])

          return scales;
        };

        var drawScatterPlot = function () {
          
          var width = 500,
              height = 300,
              padding = 30;

          var dataset = [
            [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
            [410, 12], [475, 44], [25, 67], [85, 21], [220, 88],
            [600, 150]
          ];

          dataset = generateRandomDataset();

          // Generate scale for x axis, y axis, and radius.
          var scales = generateScales(dataset, width, height, padding);

          // Generate scale for color.
          var color = d3.scale.category10();

          // Create xAxis using x scale.
          var xAxis = d3.svg.axis()
            .scale(scales.x)
            .orient('bottom')
            .ticks(5)

          var yAxis = d3.svg.axis()
            .scale(scales.y)
            .orient('left')
            .ticks(5)

          // Create SVG element.
          var svg = d3.select('.axes')
            .select('.sandbox')
            .append('svg')
              .attr('width', width)
              .attr('height', height)
              .style("border", "1px solid black")

          // Draw circles according to dataset.
          var circles = svg.selectAll('circle')
            .data(dataset)
            .enter()
            .append('circle')
              // Set position.
              .attr('cx', function (d) {
                return scales.x(d[0]);
              })
              .attr('cy', function (d) {
                return scales.y(d[1]);
              })
              // Set scaled radius and color.
              .attr('r', function (d) {
                return scales.radius(d[1]);
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
                return scales.x(d[0]);
              })
              .attr('y', function (d) {
                return scales.y(d[1]);
              })
              // Text, style.
              .text(function (d) {
                return d[0] + ', ' + d[1];
              })
                .attr({
                  'font-family': 'Fondamento',
                  'font-size': '10px',
                  'fill': 'black'
                })

            // Draw x axis.
            svg.append('g')
              .attr('class', 'axis')
              .attr('transform', 'translate(0,' + (height - padding) + ')')
              .attr({
                'font-family': 'Fondamento',
                'font-size' : '10px',
                'fill': 'orange'
              })
              .call(xAxis);

            svg.append('g')
              .attr('class', 'axis')
              .attr('transform', 'translate(' + padding + ', 0)')
              .attr({
                'font-family': 'Fondamento',
                'font-size' : '10px',
                'fill': 'blue'
              })
              .call(yAxis)
        };

        // Initialization.
       
        drawScatterPlot();
        
      }]
    };
  });
