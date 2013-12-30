'use strict';

angular.module('radialMenuApp')
  .directive('pieMenu', function () {
    return {
      templateUrl: 'views/pieMenu.html',
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

        var arc = d3.svg.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);

        var svg = d3.select('pie-menu')
          .append('svg')
            .attr('width', w)
            .attr('height', h);

        var arcs = svg.selectAll("g.arc")
            .data(pie(dataset))
            .enter()
          .append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")")

        //Draw arc paths
        arcs.append("path")
            .attr("fill", function(d, i) { // d = value, i = key
              return color(i); })
            .attr("d", arc);

        arcs.append("text")
            .attr("transform", function(d) {
              return "translate(" + arc.centroid(d) + ")"; })
            .attr("text-anchor", "middle") .text(function(d) {
              return d.value; });

        /*
        var width = 960,
            height = 500,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.ordinal()
            .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

        var arc = d3.svg.arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        var pie = d3.layout.pie()
            .sort(null)
            .value(function(d) { return d.population; });

        var svg = d3.select('pie-menu').append('svg')
            .attr('width', width)
            .attr('height', height)
          .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        d3.csv('data.csv', function(error, data) {

          data.forEach(function(d) {
            d.population = +d.population;
          });

          var g = svg.selectAll('.arc')
              .data(pie(data))
            .enter().append('g')
              .attr('class', 'arc');

          g.append('path')
              .attr('d', arc)
              .style('fill', function(d) { return color(d.data.age); });

          g.append('text')
              .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
              .attr('dy', '.35em')
              .style('text-anchor', 'middle')
              .text(function(d) { return d.data.age; });

        });
        */
      }
    };
  });
