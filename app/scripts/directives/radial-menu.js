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
        
        var svg, arcs, arc, innerRadius, outerRadius, group, path, background, 
            section1, section2, section3, section4,
            width, height, tau;
        
        var color = d3.scale.category10();
        var isMenuOpen = false;

        // Methods.
        
        var initializeArcs = function () {

          width = 500;
          height = 500;
          tau = 2 * Math.PI;
          innerRadius = 40;
          outerRadius = 240;
          arcs = [];

          svg = d3.select('.radial-menu')
            .select('.sandbox')
            .append('svg')
              .attr('width', width)
              .attr('height', height)
              .style('border', '1px dashed gray')

          // An arc function with all values bound except the endAngle. So, to compute an
          // SVG path string for a given angle, we pass an object with an endAngle
          // property to the `arc` function, and it will return the corresponding string.
          arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)

          // Create the SVG container, and apply a transform such that the origin is the
          // center of the canvas. This way, we don't need to position arcs individually.
          group = svg.append('g')
              .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')')

          // Add the background arc, from 0 to 100% (τ).
          background = group.append('path')
              .datum({ startAngle: 0, endAngle: tau })
              .style('fill', '#ddd')
              .attr('d', arc);

          angular.forEach($scope.radialOptions, function (value, key) {

            var startAngle = (tau / $scope.radialOptions.length) * key;

            arcs.push(group.append('path')
              .datum({ startAngle: 0, endAngle: 0 })
              .style('fill', color(key))
              .attr('d', arc))
          });
        };

        // Creates a tween on the specified transition's "d" attribute, transitioning
        // any selected arcs from their current angle to the specified new angle.
        var arcTween = function (transition, newAngle) {

          transition.attrTween('d', function (d) {

            var interpolateEndAngle = d3.interpolate(d.endAngle, newAngle);

            return function (t) {
              
              d.endAngle = interpolateEndAngle(t);
              return arc(d);
            };
          });
        };

        // Creates a tween on the specified transition's "d" attribute, transitioning
        // any selected arcs from their current angle to the specified new angle.
        var startArcTween = function (transition, newAngle) {

          transition.attrTween('d', function (d) {

            var interpolate = d3.interpolate(d.startAngle, newAngle);

            return function (t) {
              
              d.startAngle = interpolate(t);
              return arc(d);
            };
          });
        };

        // Initialization.
        
        initializeArcs();

        // API.
        
        // Use transition.call (identical to selection.call) so that we 
        // can encapsulate the logic for tweening the arc in a separate function below.
        $scope.updateArc = function () {

          // Open menu.
          if (!isMenuOpen) {
            angular.forEach(arcs, function (arc, key) {

              var newEndAngle = (1/arcs.length) * (arcs.length - key) * tau;

              // newStartAngle is just offset by one pie arc.  Simple!
              var newStartAngle = newEndAngle - (tau / arcs.length);

              arc.transition()
                .duration(700)
                .call(arcTween, newEndAngle)
                .transition()
                .duration(300)
                .call(startArcTween, newStartAngle)
              
            });
          }
          // Close menu.
          else {
            // Set all starting and ending angles to zero for
            // each arc.
            angular.forEach(arcs, function (arc, key) {

              arc.transition()
                .duration(100)
                .call(startArcTween, 0)
                .transition()
                .duration(1000)
                .call(arcTween, 0)
              
            });
          }

          // Toggle menu state.
          isMenuOpen = !isMenuOpen;

        };
      }]
    };
  });
