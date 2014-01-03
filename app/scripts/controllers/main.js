'use strict';

angular.module('radialMenuApp')
  .controller('MainCtrl', function ($scope) {
  
    $scope.data = [
      {
        label: 'Sink',
        value: 1
      },
      {
        label: 'Attach',
        value: 2
      }
    ];
  });
