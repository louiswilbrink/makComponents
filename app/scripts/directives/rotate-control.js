'use strict';

angular.module('VantageController')
  .directive('rotateControl', function () {
    return {
      templateUrl: 'views/rotate-control.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        scope.rotateControl = {

          rotateLeftPath: '../artwork/rotateLeft.png',

          rotateRightPath: '../artwork/rotateRight.png',

          rotateUpPath: '../artwork/rotateUp.png',

          rotateDownPath: '../artwork/rotateDown.png',

          rotateStoppedPath: '../artwork/rotateStopped.png',

          rotateSrcPath: '../artwork/rotateStopped.png'
        };

        // Event-handlers.
        // -------------------------------------------------
        // These events are emitted by mak-rotate directive.
        // They reflect the actions triggered by touches
        // on a canvas.

        scope.$on('ROTATE_UP', function () {
          console.log('$on.ROTATE_UP');
          scope.rotateControl.rotateSrcPath = scope.rotateControl.rotateUpPath;
          scope.$digest();
        });

        scope.$on('ROTATE_DOWN', function () {
          console.log('$on.ROTATE_DOWN');
          scope.rotateControl.rotateSrcPath = scope.rotateControl.rotateDownPath;
          scope.$digest();
        });

        scope.$on('ROTATE_LEFT', function () {
          console.log('$on.ROTATE_LEFT');
          scope.rotateControl.rotateSrcPath = scope.rotateControl.rotateLeftPath;
          scope.$digest();
        });

        scope.$on('ROTATE_RIGHT', function () {
          console.log('$on.ROTATE_RIGHT');
          scope.rotateControl.rotateSrcPath = scope.rotateControl.rotateRightPath;
          scope.$digest();
        });

        scope.$on('ROTATE_STOPPED', function () {
          console.log('$on.ROTATE_STOPPED');
          scope.rotateControl.rotateSrcPath = scope.rotateControl.rotateStoppedPath;
          scope.$digest();
        });
      }
    };
  });
