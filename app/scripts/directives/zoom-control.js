'use strict';

angular.module('VantageController')
  .directive('zoomControl', function () {
    return {
      templateUrl: 'views/zoom-control.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {

        scope.zoomControl = {

          zoomOutPath: '../artwork/zoomOut.png',

          zoomInPath: '../artwork/zoomIn.png',

          zoomStoppedPath: '../artwork/zoomStopped.png',

          zoomSrc: '../artwork/zoomStopped.png'
        };

        // Event-handlers.

        scope.$on('ZOOM_IN', function () {
          scope.zoomControl.zoomSrc = scope.zoomControl.zoomInPath;
          scope.$digest();
        });

        scope.$on('ZOOM_OUT', function () {
          scope.zoomControl.zoomSrc = scope.zoomControl.zoomOutPath;
          scope.$digest();
        });

        scope.$on('ZOOM_STOPPED', function () {
          scope.zoomControl.zoomSrc = scope.zoomControl.zoomStoppedPath;
          scope.$digest();
        });
      }
    };
  });
