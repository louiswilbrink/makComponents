'use strict';

angular.module('radialMenuApp')
  .directive('scales', function () {
    return {
      templateUrl: 'views/scales.html',
      restrict: 'E',
      controller: function ($scope) {

        // Model.
        
        $scope.scales = {
          scaledOutputs : []
        };

        // Methods.

        var simpleScale = function () {

          var dataset = [ 100, 200, 300, 400, 500 ];

          var minDomain = 100,
              maxDomain = 500,
              minRange = 10,
              maxRange = 350;

          var scale = d3.scale.linear()
            .domain([ minDomain, maxDomain ])
            .range([ minRange, maxRange ]);

          // Scale each datum in dataset.
          angular.forEach(dataset, function (value, key) {

            var input = value;
            var scaledOutput = scale(value);

            $scope.scales.scaledOutputs.push([input, scaledOutput]);
          });

          console.log($scope.scales.scaledOutputs);
        };

        // Initialization.
       
        simpleScale();
        
      }
    };
  });
