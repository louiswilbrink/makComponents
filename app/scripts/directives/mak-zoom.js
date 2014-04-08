'use strict';

angular.module('VantageController')
  .directive('makZoom', ['WebLVCService', 'ViewService', function (WebLVCService, ViewService) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        var ZOOM_STOPPED = 0;
        var ZOOM_IN = 1;
        var ZOOM_OUT = 2;

        var state = ZOOM_STOPPED;

        var canvas = element[0];

        // Stop all browser default behavior (scroll, hold, zoom, etc).
        Hammer(canvas).on('hold drag dragdown dragup swipe swipeup swipedown', function (ev) {
          ev.gesture.preventDefault();
        });

        var generateKeyPressMessage = function (key, isPressed) {
          return {
             MessageKind: 2,
             InteractionType : "MAK:VrvKeyPress",
             ObserverName :  ViewService.currentObserver,
             Key: key,
             Pressed: isPressed, 
             Modifiers : {Shift: false, Alt: false, Ctrl: false}
          };
        };

        var zoomIn = function () {
          if (state === ZOOM_OUT) {
            stopZoom();
          }
          if (state !== ZOOM_IN) {
            WebLVCService.send(generateKeyPressMessage('w', true));
            state = ZOOM_IN;
            console.log('ZOOM_IN');
            scope.$emit('ZOOM_IN');
          }
        };

        var zoomOut = function () {
          if (state === ZOOM_IN) {
            stopZoom();
          }
          if (state !== ZOOM_OUT) {
            WebLVCService.send(generateKeyPressMessage('s', true));
            state = ZOOM_OUT;
            console.log('ZOOM_OUT');
            scope.$emit('ZOOM_OUT');
          }
        };

        var stopZoom = function () {
          if (state !== ZOOM_STOPPED) {
            if (state === ZOOM_IN) {
              WebLVCService.send(generateKeyPressMessage('w', false));
            }
            if (state === ZOOM_OUT) {
              WebLVCService.send(generateKeyPressMessage('s', false));
            }

            state = ZOOM_STOPPED;
            console.log('ZOOM_STOPPED');
            scope.$emit('ZOOM_STOPPED');
          }
        };

        var decideZoom = function () {
          var canvasY = event.touches[0].clientY - element[0].parentElement.offsetTop - element[0].parentElement.parentElement.offsetTop;
          if (canvasY < element.height() / 2) {
            zoomIn();
          }
          if (canvasY > element.height() / 2) {
            zoomOut();
          }
        };

        canvas.addEventListener('touchstart', decideZoom);
        canvas.addEventListener('touchmove', decideZoom);
        canvas.addEventListener('touchend', stopZoom);
      }
    };
  }]);
