'use strict';

angular.module('radialMenuApp')
  .directive('radialMenu', function () {
    return {
      scope: {
        radialOptions: '=',
        width: '='
      },
      templateUrl: 'views/radial-menu.html',
      restrict: 'E',
      controller: ['$scope', 'Util', function ($scope, Util) {

        // Model.

        var options, width, height, vis, groups, labels, arcs,
            innerRadius, outerRadius, tau, color, isClosed;

        // This menu should always be a square.
        width = height = $scope.width;

        options = $scope.radialOptions;

        innerRadius = height / 10,
        outerRadius = height / 2;

        tau = 2 * Math.PI;
        color = d3.scale.category10();
        isClosed = true;

        // Methods.
        
        var assignExpandedValues = function () {

          angular.forEach(options, function (option, key) {

            option.endAngle = (1/options.length) * (options.length - key) * tau;

            // newStartAngle is just offset by one pie arc.  Simple!
            option.startAngle = option.endAngle - (tau / options.length);
          });
        };

        var assignCollapseAngleValues = function () {
          // Make each arc a zero-sliver.
          angular.forEach(options, function (option) {
            option.startAngle = 0;
            option.endAngle = 0;
          });
        };

        var clickFeedback = function (path) {
          console.log('I\'ve been clicked!');
          //d3.select(path)
              //.attr('fill', 'red');
        };

        var drawArc = d3.svg.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
          .startAngle(function (d) {
            return d.startAngle;
          })
          .endAngle(function (d) {
            return d.endAngle;
          });

        var arcTween = function (d) {

          // Create an interpolator to generate values between initial
          // and final states.  This will be handed to the arc-generator,
          // providing angle values at each instant of time.
          var interpolate = d3.interpolate(
            // Initial values.  Stored these from previous 'd' data.
            {
              startAngle: this._current.startAngle,
              endAngle: this._current.endAngle
            },
            // Final values.  This is the newest 'd' data, which wrote
            // over the previous 'd' data.
            {
              startAngle: d.startAngle,
              endAngle: d.endAngle
            });

          // Keep track of latest 'd' data for next transition.
          this._current.startAngle = d.startAngle;
          this._current.endAngle = d.endAngle;

          return function(t) { 

            // this arc generator will use the output values of a time-based
            // interpolator function.  In this way, the arc is drawn and morphed
            // over time to a final shape.
            return drawArc(interpolate(t)); 
          }
        };

        var initialize = function (dataset) {

          vis = d3.select('.radial-menu-container')
            .append('svg')
              .attr('width', width)
              .attr('height', height)
              //.style('border', '1px dashed gray')

          // Create arcs nested in groups.
          arcs = vis.selectAll('g')
            .data(dataset)
            .enter()
            .append('g') 
            .append("svg:path")
              .attr("fill", function(d, i){
                return color(i);
              })
              .attr("transform", "translate(" + width / 2 + ", " + height / 2 + ")")
              .attr("d", drawArc)
              .on('click', function (d) {
                $scope.$emit(d.emit.message, d.emit.item);
                clickFeedback(this);
              })
              .each(function(d){
                this._current = {};
                this._current.startAngle = d.startAngle;
                this._current.endAngle = d.endAngle;
             });

          groups = vis.selectAll('g');
        };
          
        var render = function (dataset) {

          arcs.transition()
            .duration(1000)
            .attrTween("d", arcTween);
        };

        var updateArc = function () {

          if (isClosed) {
        
            assignCollapseAngleValues();
            initialize(options);

            // Fan out the radial menu.
            // Load each option with the proper arc angles.
            assignExpandedValues();

            render(options);

            labels = groups.append('text')
                .text(function (d) {
                  return d.label;
                })
                .attr('text-anchor', 'middle')
                .attr("transform", function(d) { 
                  var translatePosition = drawArc.centroid({ innerRadius: innerRadius, outerRadius: outerRadius, startAngle: d.startAngle, endAngle: d.endAngle });
                  translatePosition[0] += width / 2;
                  translatePosition[1] += height / 2;
                  return "translate(" + translatePosition + ")";
                })
                .on('click', function (d) {
                  console.log(d.emit);
                  $scope.$emit(d.emit.message, d.emit.item);
                  clickFeedback(this);
                })
                .style('opacity', '0')
                .transition()
                .duration(300)
                .delay(1000)
                .style('opacity', '1')
          }
          else {
            // Fan in and close the radial menu.
            assignCollapseAngleValues();

            vis.selectAll('text')
                .transition()
                .duration(300)
                .style('opacity', '0')
                //.remove()

            render(options);

            vis.transition().delay(800).remove();
          }

          // Toggle state.
          isClosed = !isClosed;
        };

        // Initialization.

        // API.
        
        $scope.$on('Expand Radial Menu', function () {
          updateArc();
        });
      }]
    };
  });
