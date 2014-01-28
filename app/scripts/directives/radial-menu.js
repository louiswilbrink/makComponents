'use strict';

angular.module('radialMenuApp')
  .directive('radialMenu', function () {
    return {
      templateUrl: 'views/radial-menu.html',
      restrict: 'E',
      controller: ['$scope', 'Util', function ($scope, Util) {

        // Model.
        
        var svg, arc, innerRadius, outerRadius, group, path, background, 
            section1, section2, section3, section4,
            width, height, tau;
        
        // Methods.
        
        var initializeArc = function () {

          width = 500;
          height = 500;
          tau = 2 * Math.PI;
          innerRadius = 40;
          outerRadius = 240;

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
            .startAngle(0)

          // Create the SVG container, and apply a transform such that the origin is the
          // center of the canvas. This way, we don't need to position arcs individually.
          group = svg.append('g')
              .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')')

          // Add the background arc, from 0 to 100% (τ).
          background = group.append('path')
              .datum({ endAngle: tau })
              .style('fill', '#ddd')
              .attr('d', arc);

          section1 = group.append('path')
              .datum({ endAngle: 0 })
              .style('fill', 'orange')
              .attr('d', arc)

          section2 = group.append('path')
              .datum({ endAngle: 0 })
              .style('fill', 'blue')
              .attr('d', arc)

          section3 = group.append('path')
              .datum({ endAngle: 0 })
              .style('fill', 'red')
              .attr('d', arc)

          section4 = group.append('path')
              .datum({ endAngle: 0 })
              .style('fill', 'green')
              .attr('d', arc)
        };

        // Creates a tween on the specified transition's "d" attribute, transitioning
        // any selected arcs from their current angle to the specified new angle.
        var arcTween = function (transition, newAngle) {

          transition.attrTween('d', function (d) {

            var interpolate = d3.interpolate(d.endAngle, newAngle);

            return function (t) {
              
              d.endAngle = interpolate(t);
              return arc(d);
            };
          });
        };

        // Initialization.
        
        initializeArc();

        // API.
        
        // Use transition.call (identical to selection.call) so that we 
        // can encapsulate the logic for tweening the arc in a separate function below.
        $scope.updateArc = function () {

          section1.transition()
            .duration(500)
            .call(arcTween, tau)

          section2.transition()
            .duration(500)
            .call(arcTween, 0.75 * tau)

          section3.transition()
            .duration(500)
            .call(arcTween, 0.5 * tau)

          section4.transition()
            .duration(500)
            .call(arcTween, 0.25 * tau)
        };
      }]
    };
  });
