'use strict';

angular.module('radialMenuApp')
  .controller('MainCtrl', ['$scope', 'Util', function ($scope, Util) {

    $scope.width = 500;

    $scope.mainCtrl = {
      entities: {
        ddg: {
          tasks: [
            {
              label: 'Sink',
              emit: {
                message: 'Menu Item Clicked',
                item: 'Sinking entity'
              },
              startAngle: 0,
              endAngle: Math.PI / 6 
            },
            {
              label: 'Attach',
              emit: {
                message: 'Menu Item Clicked',
                item: 'Attaching to entity'
              },
              startAngle: 0,
              endAngle: 2 * (Math.PI / 6)
            },
            {
              label: 'Marauding',
              emit: {
                message: 'Menu Item Clicked',
                item: 'Entity is on a marauding rampage!'
              },
              startAngle: 0,
              endAngle: 3 * (Math.PI / 6)
            },
            {
              label: 'Destroy',
              emit: {
                message: 'Menu Item Clicked',
                item: 'Entity Destroyed'
              },
              startAngle: 0,
              endAngle: 4 * (Math.PI / 6)
            },
            {
              label: 'Protect',
              emit: {
                message: 'Menu Item Clicked',
                item: 'Protect the area!'
              },
              startAngle: 0,
              endAngle: 5 * (Math.PI / 6)
            },
            {
              label: 'Retreat',
              emit: {
                message: 'Menu Item Clicked',
                item: 'Entity is retreating'
              },
              startAngle: 0,
              endAngle: 6 * (Math.PI / 6)
            },
            {
              label: 'Move',
              emit: {
                message: 'Menu Item Clicked',
                item: 'Target is moving to a new location'
              },
              startAngle: 0,
              endAngle: 7 * (Math.PI / 6)
            }
          ],
        }
      }
    };

    $scope.$on('Menu Item Clicked', function (event, item) {
      console.log('Got out!', item);
      $scope.entityInstructions = item;
    });
  }]);
