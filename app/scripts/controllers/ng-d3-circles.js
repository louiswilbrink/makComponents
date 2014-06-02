'use strict';

angular.module('makComponents')
  .controller('NgD3CirclesCtrl', function ($scope, $timeout) {

    var theta = 0;

    $scope.circles = [
      {
        cx: 100,
        cy: 100,
        r: 20,
        fill: 'blue'
      },
      {
        cx: 200,
        cy: 200,
        r: 20,
        fill: 'red'
      },
      {
        cx: 300,
        cy: 300,
        r: 20,
        fill: 'green'
      },
      {
        cx: 400,
        cy: 400,
        r: 20,
        fill: 'orange'
      }
    ];

    function incrementTheta () {
      theta += Math.PI / 180;

      if (theta === (Math.PI / 2)) {
        console.log('PI / 2');
      }
      else if (theta === (Math.PI)) {
        console.log('PI');
      }
      else if (theta === ((3 * Math.PI) / 2)) {
        console.log('3PI / 2');
      }
      else if (theta === (2 * Math.PI)) {
        console.log('2PI');
        theta = 0;
      }

      // Exceeds maximum call stack.
      //$timeout(incrementTheta(), 1000);
    };

    incrementTheta();
  });
