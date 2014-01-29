'use strict';

angular.module('radialMenuApp')
  .controller('MainCtrl', ['$scope', 'Util', function ($scope, Util) {

    $scope.tasks = [];

    var task = {
      label: 'label',
      task: function () {
        console.log('swell day huh?');
      }
    };

    var taskTotal = Util.randomNumberBetween(2, 7);

    for (var i = 0; i < taskTotal; i++) {
      $scope.tasks.push(task);
    };

    console.log($scope.tasks);

    $scope.mainCtrl = {
      entities: {
        ddg: {
          tasks: [
            {
              label: 'Sink',
              task: function () {
                console.log('sinking..');
              }
            },
            {
              label: 'Attach',
              task: function () {
                console.log('Attaching');
              }
            },
            {
              label: 'Sink',
              task: function () {
                console.log('sinking..');
              }
            },
            {
              label: 'Attach',
              task: function () {
                console.log('Attaching');
              }
            },
            {
              label: 'Sink',
              task: function () {
                console.log('sinking..');
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
