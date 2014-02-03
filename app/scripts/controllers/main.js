'use strict';

angular.module('radialMenuApp')
  .controller('MainCtrl', ['$scope', 'Util', function ($scope, Util) {

    $scope.tasks = [];
    $scope.width = 500;

    var task = {
      label: 'label',
      task: function () {
        console.log('swell day huh?');
      }
    };

    var taskTotal = 4;//Util.randomNumberBetween(2, 7);

    for (var i = 0; i < taskTotal; i++) {
      $scope.tasks.push(task);
    };

    $scope.mainCtrl = {
      entities: {
        ddg: {
          tasks: [
            {
              label: 'Sink',
              task: function () {
                console.log('sinking..');
              },
              startAngle: 0,
              endAngle: Math.PI / 6 
            },
            {
              label: 'Attach',
              task: function () {
                console.log('Attaching');
              },
              startAngle: 0,
              endAngle: 2 * (Math.PI / 6)
            },
            {
              label: 'Sink',
              task: function () {
                console.log('sinking..');
              },
              startAngle: 0,
              endAngle: 3 * (Math.PI / 6)
            },
            {
              label: 'Attach',
              task: function () {
                console.log('Attaching');
              },
              startAngle: 0,
              endAngle: 4 * (Math.PI / 6)
            },
            {
              label: 'Sink',
              task: function () {
                console.log('sinking..');
              },
              startAngle: 0,
              endAngle: 5 * (Math.PI / 6)
            },
            {
              label: 'Attach',
              task: function () {
                console.log('Attaching');
              },
              startAngle: 0,
              endAngle: 6 * (Math.PI / 6)
            },
            {
              label: 'Move',
              task: function () {
                console.log('Moving');
              },
              startAngle: 0,
              endAngle: 7 * (Math.PI / 6)
            }
          ],
        },
        jet: {
          tasks: [
            {
              label: 'Destroy',
              task: function () {
                console.log('Destroying..');
              }
            },
            {
              label: 'Attach',
              task: function () {
                console.log('Attaching');
              }
            },
            {
              label: 'Move',
              task: function () {
                console.log('Moving');
              }
            }
          ]
        }
      }
    };

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

  }]);
