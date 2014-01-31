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

        var vis, labels, arcs, arc, innerRadius, outerRadius, groups, path,
            background, section1, section2, section3, section4,
            width, height, tau;

        var tau = 2 * Math.PI,
            innerRadius = 40;
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
          .startAngle(0 * (Math.PI/180))
          .endAngle(function(d, i) {
            return Math.floor((d*6 * (Math.PI/180))*1000)/1000;
          });

        var arcTween = function (d, indx) {
          console.log('current: ', this._current);
          console.log('d: ', d);
          var interp = d3.interpolate(this._current, d);    

          this._current = d;

          return function(t) { 

            var tmp = interp(t); 

            return drawArc(tmp, indx); 
          }
        };

        var initialize = function () {

          width = 500;
          height = 500;

          vis = d3.select('.radial-menu')
            .select('.sandbox')
            .append('svg')
              .attr('width', width)
              .attr('height', height)
              .style('border', '1px dashed gray')
        };
          
        var render = function (dataset) {

          groups = [];
          arcs = [];

          var redArcs = vis.selectAll("path.red-path").data(dataset);

          redArcs.transition()
            .duration(300)
            .attr("fill", function(d){
              var red = Math.floor((1 - d/60)*255);
              return "rgb("+ red +", 51, 51)";
            })
            .attrTween("d", arcTween);

          redArcs.enter().append("svg:path")
              .attr("class", "red-path")
              .attr("transform", "translate(250,250)")
              .attr("fill", function(d){
                var red = Math.floor((1 - d/60)*255);
                return "rgb("+ red +", 51, 51)";
              })
              .attr("d", drawArc)
              .each(function(d){
                this._current = d;
             });
        };

        // Initialization.
        
        initialize();
        render([0,0,0,0,0,0]);

        // API.
        
        // Use transition.call (identical to selection.call) so that we 
        // can encapsulate the logic for tweening the arc in a separate function below.
        $scope.updateArc = function () {

          render(Util.getArrayOfRandomNumbers(6, 10, 55));

        };
      }]
    };
  });
