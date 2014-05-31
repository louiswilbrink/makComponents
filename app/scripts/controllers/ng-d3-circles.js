'use strict';

angular.module('makComponents')
  .controller('NgD3CirclesCtrl', function ($scope, $timeout) {

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

    $timeout(function () {
      $scope.circles[0] = {
        cx: 500,
        cy: 500,
        r: 20,
        fill: 'blue'
      };
    }, 2000);
  });
