'use strict';

angular.module('radialMenuApp')
  .directive('someDataExamples', function () {
    return {
      templateUrl: 'views/dataExamples.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        var dataset = [];

        var createNewParagraphs = function (dataset) {

          d3.select('.some-data-examples')
            .selectAll('h2')
            .data(dataset.entities)
            .enter()
            .append('h2')
              .text(function (d) {
                return d.entityName;
              })
              .style('color', function (d) {
                if (d.entityName === 'Jet') {
                  return 'red';
                }
                else {
                  return 'green';
                }
              });
            
        };

        d3.json("dataset.json", function (json) {
          dataset = json;
          createNewParagraphs(dataset);
        });
      }
    };
  });
