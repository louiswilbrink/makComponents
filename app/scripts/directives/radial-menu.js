'use strict';

angular.module('radialMenuApp')
  .directive('radialMenu', function () {
    return {
      scope: {
        radialOptions: '='
      },
      templateUrl: 'views/radial-menu.html',
      restrict: 'E',
      controller: ['$scope', 'Util', function ($scope, Util) {

        // Model.

        var options = $scope.radialOptions;

        var vis, groups, labels, arcs, arc, width, height, tau;

        var tau = 2 * Math.PI,
            innerRadius = 40,
            outerRadius = 240;
        
        var color = d3.scale.category10();
        var isClosed = true;

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
          // providing angle values for each instant of time.
          var interpolate = d3.interpolate(
            // Initial values.  Stored these from previous 'd' data.
            {
              startAngle: this._current.startAngle,
              endAngle: this._current.endAngle
            },
            // Final values.  These are the newest 'd' data, and wrote
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

          width = 500;
          height = 500;

          vis = d3.select('.radial-menu')
            .select('.sandbox')
            .append('svg')
              .attr('width', width)
              .attr('height', height)
              .style('border', '1px dashed gray')

          arcs = vis.selectAll('g')
            .data(dataset)
            .enter()
            .append('g') 
            .append("svg:path")
              .attr("class", "red-path")
              .attr("fill", function(d, i){
                return color(i);
              })
              .attr("transform", "translate(250,250)")
              .attr("d", drawArc)
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

        // Initialization.
        
        assignCollapseAngleValues();
        initialize(options);

        // API.
        
        $scope.updateArc = function () {

          if (isClosed) {
            // Fan out the radial menu.
            // Load each option with the proper arc angles.
            assignExpandedValues();
          }
          else {
            // Fan in and close the radial menu.
            assignCollapseAngleValues();
          }

          render(options);

          // Toggle state.
          isClosed = !isClosed;
        };
      }]
    };
  });
