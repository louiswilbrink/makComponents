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

        var vis, labels, arcs, arc, width, height, tau;

        var tau = 2 * Math.PI,
            innerRadius = 40,
            outerRadius = 240;
        
        var color = d3.scale.category10();
        var isMenuOpen = false;

        // Methods.
        
        var getArcAngles = function () {

          var arcAngles = [];
          var tau = 2 * Math.PI;

          for (var i = 0; i < options.length; i++) {

            var arcAngle = {};

            arcAngle.newEndAngle = (1/options.length) * (options.length - i) * tau;

            // newStartAngle is just offset by one pie arc.  Simple!
            arcAngle.newStartAngle = arcAngle.newEndAngle - (tau / options.length);

            arcAngles.push(arcAngle);
          }

          return arcAngles;
        };

        var drawArc = d3.svg.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
          .startAngle(0)
          .endAngle(function(d, i) {
            return Math.floor((d.endAngle*6 * (Math.PI/180))*1000)/1000;
          });

        var arcTween = function (d) {

          var interpolate = d3.interpolate({ 
            startAngle: this._current.startAngle,
            endAngle: this._current.endAngle
          }, {
            startAngle: d.startAngle,
            endAngle: d.endAngle
          });

          this._current = d;

          return function(t) { 

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

          arcs = vis.selectAll("path.red-path").data(dataset);

          arcs.enter().append("svg:path")
              .attr("class", "red-path")
              .attr("fill", function(d, i){
                return color(i);
              })
              .attr("transform", "translate(250,250)")
              .attr("d", drawArc)
              .each(function(d){
                this._current = d;
             });
        };
          
        var render = function (dataset) {

          arcs = vis.selectAll("path.red-path").data(dataset);

          arcs.transition()
            .duration(300)
            .attrTween("d", arcTween);

        };

        // Initialization.
        
        // Make each arc start as a zero-sliver.
        angular.forEach(options, function (option) {
          option.startAngle = 0;
          option.endAngle = Math.PI / 2;
        });

        initialize(options);

        // API.
        
        $scope.updateArc = function () {

          // For now, just make all of the arcs expand to half-pie
          angular.forEach(options, function (option) {
            option.endAngle += Math.PI / 2;
          });

          render(options);
        };
      }]
    };
  });
