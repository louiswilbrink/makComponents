'use strict';

angular.module('radialMenuApp')
  .controller('MainCtrl', function ($scope) {

    var body = d3.select('body');
    body.append('p').text('I was appended by the MainCtrl script!');
  
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
