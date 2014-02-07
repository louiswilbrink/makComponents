'use strict';

angular.module('makComponents')
  .directive('axes', function () {
    return {
      templateUrl: 'views/axes.html',
      restrict: 'E',
      controller: ['$scope', 'Util', function ($scope, Util) {

        // Model.
        
        var dataset, scales, color, width, height, padding,
            xAxis, yAxis, xAxisScale, yAxisScale, svg, circles, labels;
        
        // Methods.
        
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

        var initializeScatterPlot = function () {
          
          width = 500;
          height = 300;
          padding = 30;

          dataset = Util.getArrayOfRandomPairs();

          // Generate scale for x axis, y axis, and radius.
          scales = generateScales(dataset, width, height, padding);

          // Generate scale for color.
          color = d3.scale.category10();

          // Create xAxis using x scale.
          xAxisScale = d3.svg.axis()
            .scale(scales.x)
            .orient('bottom')
            .ticks(5)

          yAxisScale = d3.svg.axis()
            .scale(scales.y)
            .orient('left')
            .ticks(5)

          // Create SVG element.
          svg = d3.select('.axes')
            .select('.sandbox')
            .append('svg')
              .attr('width', width)
              .attr('height', height)
              .style("border", "1px solid black")

          // Draw circles according to dataset.
          circles = svg.selectAll('circle')
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
          labels = svg.selectAll('text')
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
            xAxis = svg.append('g')
              .attr('class', 'axis')
              .attr('transform', 'translate(0,' + (height - padding) + ')')
              .attr({
                'font-family': 'Fondamento',
                'font-size' : '10px',
                'fill': 'orange'
              })
              .call(xAxisScale);

            yAxis = svg.append('g')
              .attr('class', 'axis')
              .attr('transform', 'translate(' + padding + ', 0)')
              .attr({
                'font-family': 'Fondamento',
                'font-size' : '10px',
                'fill': 'blue'
              })
              .call(yAxisScale)
        };

        // Initialization.
       
        initializeScatterPlot();

        // API.
        
        $scope.getNewDataset = function () {

          // Get new data: 50 Pairs of random coordinates.
          dataset = Util.getArrayOfRandomPairs();

          // Generate scale for x axis, y axis, and radius.
          scales = generateScales(dataset, width, height, padding);

          // Create xAxis using x scale.
          xAxisScale = d3.svg.axis()
            .scale(scales.x)
            .orient('bottom')
            .ticks(5)

          yAxisScale = d3.svg.axis()
            .scale(scales.y)
            .orient('left')
            .ticks(5)

          // Draw circles according to dataset.
          circles = svg.selectAll('circle')
            .data(dataset)
            .transition()
            .duration(1000)
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
          labels = svg.selectAll('text')
            .data(dataset)
            .transition()
            .duration(1000)
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
          xAxis.transition().duration(1000)
            .attr('class', 'axis')
            .attr('transform', 'translate(0,' + (height - padding) + ')')
            .attr({
              'font-family': 'Fondamento',
              'font-size' : '10px',
              'fill': 'orange'
            })
            .call(xAxisScale);

          yAxis.transition().duration(1000)
          .attr('class', 'axis')
            .attr('transform', 'translate(' + padding + ', 0)')
            .attr({
              'font-family': 'Fondamento',
              'font-size' : '10px',
              'fill': 'blue'
            })
            .call(yAxisScale)
        };
      }]
    };
  });
