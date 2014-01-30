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
        
        var svg, labels, arcs, arc, innerRadius, outerRadius, groups, path,
            background, section1, section2, section3, section4,
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
          groups = [];
          arcs = [];

          svg = d3.select('.radial-menu')
            .select('.sandbox')
            .append('svg')
              .attr('width', width)
              .attr('height', height)
              .style('border', '1px dashed gray')

          // An arc function with all values bound except the start and end angle. This
          // will be computed during fan-in and fan-out transitions.  So, to compute an
          // SVG path string for a given angle, we pass an object with both startAngle
          // and endAngle properties to the 'arc' function and recieve the corresponding
          // string.
          arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)

          var backgroundGroup = svg.append('g')
              .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')')

          // Add the background arc, from 0 to 100% (τ).
          background = backgroundGroup.append('path')
              .datum({ startAngle: 0, endAngle: tau })
              .style('fill', '#ddd')
              .attr('d', arc);

          // Create each arc, keeping them 'invisible' for now by setting their start and
          // end angles to 0.  Later, each arc will fan-out from this initial position.
          angular.forEach($scope.radialOptions, function (value, key) {

            var group = svg.append('g')
                .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')')

            arcs.push(group.append('path')
              .datum({ startAngle: 0, endAngle: 0 })
              .style('fill', color(key))
              .attr('d', arc))

            groups.push(group);
          });
        };

        // Creates a tween on the specified transition's "d" attribute, transitioning
        // any selected arcs from their current angle to the specified new angle.
        var endArcTween = function (transition, newAngle) {

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

        var drawLabel = function (drawLabel, key, startAngle, endAngle) {

          var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(startAngle)
            .endAngle(endAngle)

          var label = groups[key].append('text')
              .text('hello')
              .attr('text-anchor', 'middle')
              .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
              .style('opacity', '0')
              .transition()
              .duration(300)
              .delay(1000)
              .style('opacity', '1')
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

              // Transition the end angle first, then transition the
              // start angle quickly (which is hidden by the layers overlaping).
              // In the end, we want as little overlap between arcs to occur so
              // that distinct selection/clicking is achieved.
              arc.transition()
                  .duration(1000)
                  .call(endArcTween, newEndAngle)
                  .transition()
                  .duration(100)
                  .call(startArcTween, newStartAngle)
                  .call(drawLabel, key, newStartAngle, newEndAngle)
            });
          }
          // Close menu.
          else {
            // Set all starting and ending angles to zero for
            // each arc.
            angular.forEach(arcs, function (arc, key) {

              // Transition the start angle first: then each arc can
              // collapse to the initial starting point where both
              // start and end angles are zero.
              arc.transition()
                .duration(100)
                .call(startArcTween, 0)
                .transition()
                .duration(1000)
                .call(endArcTween, 0)
            });
          }

          // Toggle new menu state.
          isMenuOpen = !isMenuOpen;

        };
      }]
    };
  });
