'use strict';

angular.module('makComponents')
  .directive('pieMenu1', function ($timeout) {
    return {
      templateUrl: 'views/piemenu1.html',
      restrict: 'E',
      scope: {
        pieData: '='
      },
      link: function postLink() {

        var color = d3.scale.category10();
        var dataset=[5,5,5];
        var pie = d3.layout.pie();

        var w=300;
        var h=300;

        var outerRadius = w / 2;
        var innerRadius = 0;

        var svg = d3.select('pie-menu1')
          .append('svg')
            .attr('width', w)
            .attr('height', h);

        var arc = d3.svg.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);

        var arcs = svg.selectAll('g.arc')
            .data(pie(dataset))
            .enter()
          .append('g')
            .attr('class', 'arc')
            .attr('transform', 'translate(' + outerRadius + ',' + outerRadius + ')');

        //Draw arc paths
        arcs.append('path')
          .transition()
          .attr('fill', function(d, i) { // d = value, i = key
            return color(i);
          })
          .attr('d', arc);

        arcs.append('text')
          .transition()
          .attr('transform', function(d) {
            return 'translate(' + arc.centroid(d) + ')';
          })
          .attr('text-anchor', 'middle') .text(function(d) {
            return d.value;
          });

        $timeout(function () {

          var dataset2 = [6, 6, 6, 6, 6, 6, 6];

          var arcs = svg.selectAll('g.arc')
              .data(pie(dataset2))
              .enter()
            .append('g')
              .attr('class', 'arc')
              .attr('transform', 'translate(' + outerRadius + ',' + outerRadius + ')');

          //Draw arc paths
          arcs.append('path')
            .transition()
            .attr('fill', function(d, i) { // d = value, i = key
              return color(i);
            })
            .attr('d', arc);

          arcs.append('text')
            .transition()
            .attr('transform', function(d) {
              return 'translate(' + arc.centroid(d) + ')';
            })
            .attr('text-anchor', 'middle') .text(function(d) {
              return d.value;
            });
        }, 1000);
      }
    }
  });
