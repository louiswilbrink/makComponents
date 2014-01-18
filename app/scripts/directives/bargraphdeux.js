'use strict';

angular.module('radialMenuApp')
  .directive('barGraphDeux', function () {
    return {
      templateUrl: 'views/bargraphdeux.html',
      restrict: 'E',
      controller: function (Util) {

        var dataset = [];

        var drawData = function () {

          var randomArray = Util.getArrayOfRandomNumbers(15, 10, 150);

          // Add a class to h2.
          d3.select('bar-graph-deux')
            .select('h2')
            .classed('h2-fondamento', true);

          d3.select('bar-graph-deux')
            .select('.sandbox')
            .selectAll('div')
            .data(randomArray)
            .enter()
            .append('div')
              .attr('class', 'bar')
              .style('height', function (d) {
                return d + 'px';
              })
              .style('margin-right', '3px');
        };

        d3.json("dataset.json", function (json) {
          dataset = json;
          drawData(dataset);
        });
      }
    };
  });
