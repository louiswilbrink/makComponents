'use strict';

angular.module('makComponents')
  .controller('MainCtrl', ['$scope', '$location', 'Util', function ($scope, $location, Util) {

    // Navigation.
    
    $scope.navigate = function (path) {
      $location.path('/' + path);
    };

    // Directive syntax.

    $scope.directiveSyntax = {};

    $scope.directiveSyntax.tag = 'radial-menu';
    $scope.directiveSyntax.attributeList = [
      {
        name: 'radius',
        type: 'integer'
      },
      {
        name: 'innerRadius',
        type: 'integer'
      },
      {
        name: 'options',
        type: 'object'
      },
      {
        name: 'on-option-clicked',
        type: 'function'
      },
      {
        name: 'is-closed',
        type: 'boolean'
      }
    ];

    // Radial Menu.
    
    $scope.radialMenu = {};
    $scope.radialMenu.radius = 250;
    $scope.radialMenu.innerRadius = 35;

    $scope.radialMenu.isClosed = true;

    $scope.radialMenu.entities = {
      ddg: {
        tasks: [
          { label: 'Sink' },
          { label: 'Attach' },
          { label: 'Marauding' },
          { label: 'Destroy' },
          { label: 'Protect' },
          { label: 'Retreat' },
          { label: 'Move' }
        ]
      }
    };

    $scope.radialMenu.onOptionClick = function (option) {
      console.log(option);
    };

    $scope.toggleMenu = function () {
      $scope.radialMenu.isClosed = !$scope.radialMenu.isClosed;
    };
  }]);
