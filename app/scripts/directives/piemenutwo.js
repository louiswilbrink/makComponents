'use strict';

angular.module('radialMenuApp')
  .directive('pieMenuTwo', function () {
    return {
      templateUrl: 'views/piemenutwo.html',
      restrict: 'E',
      scope: {
        pieData: '='
      },
      controller: function ($scope) {

        var color = d3.scale.category10();
        var dataset=[5,5,5];
        var pie = d3.layout.pie();

        var w=300;
        var h=300;

        var outerRadius = w / 2;
        var innerRadius = 50;

        var svg = d3.select('pie-menu-two')
          .append('svg')
            .attr('width', w)
            .attr('height', h);

        var arc = d3.svg.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
          .startAngle(0)
          .endAngle(0);

        var arcs = svg.selectAll("g.arc")
            .data(pie(dataset))
          .enter()
          .append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

        var paths = arcs.append("path")
            .attr("fill", function(d, i) {
                return color(i);
            })
            .attr("d", arc);

        $scope.expandRadialMenu = function () {
          arc = d3.svg.arc()
              .innerRadius(innerRadius)
              .outerRadius(outerRadius);
              
          paths.transition()
            .duration(1000)
            .attr("d", arc)
        };
      }
    };
  });
