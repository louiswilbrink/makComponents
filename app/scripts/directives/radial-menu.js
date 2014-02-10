'use strict';

angular.module('makComponents')
  .directive('radialMenu', function () {
    return {
      scope: {
        options: '=',
        radius: '=',
        innerRadius: '=',
        onOptionClick: '=',
        isClosed: '='
      },
      templateUrl: 'views/radial-menu.html',
      restrict: 'E',
      controller: ['$scope', 'Util', function ($scope, Util) {

        // Model.

        var vis, groups, labels, arcs, tau, color;

        tau = 2 * Math.PI;
        color = d3.scale.category10();

        // Methods.
        
        var assignExpandedAngleValues = function () {

          angular.forEach($scope.options, function (option, key) {

            option.endAngle = (1/$scope.options.length) * ($scope.options.length - key) * tau;

            // newStartAngle is just offset by one pie arc.  Simple!
            option.startAngle = option.endAngle - (tau / $scope.options.length);
          });
        };

        var assignCollapseAngleValues = function () {
          // Make each arc a zero-sliver.
          angular.forEach($scope.options, function (option) {
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
          .innerRadius($scope.innerRadius)
          .outerRadius($scope.radius)
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
              .attr('width', $scope.radius * 2)
              .attr('height', $scope.radius * 2)
              .classed('radial-menu-svg', true)

          // Create arcs nested in groups.
          arcs = vis.selectAll('g')
            .data(dataset)
            .enter()
            .append('g') 
            .append("svg:path")
              .attr("fill", function(d, i){
                return color(i);
              })
              .attr("transform", "translate(" + $scope.radius + ", " + $scope.radius + ")")
              .attr("d", drawArc)
              .on('click', function (d) {
                //clickFeedback(this);
                $scope.$apply($scope.onOptionClick(d.label));
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
            .duration(500)
            .attrTween("d", arcTween);
        };

        var updateArc = function () {

          if (!$scope.isClosed) {
        
            assignCollapseAngleValues();
            initialize($scope.options);

            // Fan out the radial menu.
            // Load each option with the proper arc angles.
            assignExpandedAngleValues();

            render($scope.options);

            labels = groups.append('text')
                .text(function (d) {
                  return d.label;
                })
                .attr('text-anchor', 'middle')
                .attr('fill', 'white')
                .attr("transform", function(d) { 
                  var translatePosition = drawArc.centroid({ innerRadius: $scope.innerRadius, outerRadius: $scope.radius, startAngle: d.startAngle, endAngle: d.endAngle });
                  translatePosition[0] += $scope.radius;
                  translatePosition[1] += $scope.radius;
                  return "translate(" + translatePosition + ")";
                })
                .on('click', function (d) {
                  //clickFeedback(this);
                  $scope.$apply($scope.onOptionClick(d.label));
                })
                .style('opacity', '0')
                .transition()
                .duration(200)
                .delay(500)
                .style('opacity', '1')
          }
          else {
            // Fan in and close the radial menu.
            assignCollapseAngleValues();

            vis.selectAll('text')
                .transition()
                .duration(200)
                .style('opacity', '0')

            render($scope.options);

            vis.transition().delay(300).remove();
          }
        };

        // Initialization.

        // Event handlers.
        
        $scope.$watch('isClosed', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            updateArc();
          }
        });
      }]
    };
  });
