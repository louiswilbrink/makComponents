'use strict';

angular.module('makComponents')
  .directive('pieMenu', function ($timeout) {
    return {
      templateUrl: 'views/piemenu.html',
      restrict: 'E',
      scope: {
        pieData: '='
      },
      link: function postLink() {

        var color = d3.scale.category10(),
            dataset=[5,5,5],
            w=300,
            h=300,
            outerRadius = w / 2,
            innerRadius = 50;

        var svg = d3.select('pie-menu')
          .append('svg')
            .attr('width', w)
            .attr('height', h);

        var arc = d3.svg.arc()
          .innerRadius(0)
          .outerRadius(100)
          .startAngle(0)
          .endAngle(3.14);

        var group = svg.selectAll("g.arc")
            .append('g')
              .attr('class', 'arc');

        var path = group.selectAll("path.path")
            .append('path')
              .attr('class', 'path')
              .attr('d', arc);

        /*
        var arcs = svg.selectAll("g.arc")
            .data(pie(dataset))
            .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

        var paths = arcs.selectAll("path.path")
            .data(pie(dataset));

        var texts = svg.selectAll("text.text")
            .data(pie(dataset))
            .style("opacity", 0)
            .attr("transform", function (d) {

                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";

            })
            .attr("text-anchor", "middle")
            .text(function (d) {
                return d;
            });

        var tweenPie = function (b) {
            b.outerRadius = r;
            b.innerRadius = innerRadius;
            var i = d3.interpolate({startAngle: 0, endAngle: 0, outerRadius: 0, innerRadius: 0}, b);
            console.log(i);
            return function(t) {
                var intermediary = i(t);
                var intermediaryArc = arc(intermediary);
                return intermediaryArc;
            };
        }

        var open = function () {
            texts.transition()
                .ease("exp-out")
                .duration(200)
                .style("opacity", 1);
        }

        paths.transition()
            .ease("exp-out")
            .duration(500)
            .attr("d", arc)
            .each("end", open)
            .attrTween("d", tweenPie);
        */
      }
    };
  });
