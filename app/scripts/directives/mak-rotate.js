'use strict';

angular.module('VantageController')
  .directive('makRotate', ['$window', 'WebLVCService', 'ViewService', function ($window, WebLVCService, ViewService) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        var ROTATE_STOPPED = 0;
        var ROTATE_UP = 1;
        var ROTATE_DOWN = 2;
        var ROTATE_LEFT = 3;
        var ROTATE_RIGHT = 4;

        var state = ROTATE_STOPPED;

        var canvas = element[0];

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

        var rotateUp = function () {
          if (state === ROTATE_DOWN || state === ROTATE_LEFT || state === ROTATE_RIGHT) {
            stopRotate();
          }
          if (state !== ROTATE_UP) {
            WebLVCService.send(generateKeyPressMessage('up', true));
            state = ROTATE_UP;
            console.log('ROTATE_UP');
            scope.$emit('ROTATE_UP');
          }
        };

        var rotateDown = function () {
          if (state === ROTATE_UP || state === ROTATE_LEFT || state === ROTATE_RIGHT) {
            stopRotate();
          }
          if (state !== ROTATE_DOWN) {
            WebLVCService.send(generateKeyPressMessage('down', true));
            state = ROTATE_DOWN;
            console.log('ROTATE_DOWN');
            scope.$emit('ROTATE_DOWN');
          }
        };

        var rotateLeft = function () {
          if (state === ROTATE_UP || state === ROTATE_DOWN || state === ROTATE_RIGHT) {
            stopRotate();
          }
          if (state !== ROTATE_LEFT) {
            WebLVCService.send(generateKeyPressMessage('left', true));
            state = ROTATE_LEFT;
            console.log('ROTATE_LEFT');
            scope.$emit('ROTATE_LEFT');
          }
        };

        var rotateRight = function () {
          if (state === ROTATE_UP || state === ROTATE_DOWN || state === ROTATE_LEFT) {
            stopRotate();
          }
          if (state !== ROTATE_RIGHT) {
            WebLVCService.send(generateKeyPressMessage('right', true));
            state = ROTATE_RIGHT;
            console.log('ROTATE_RIGHT');
            scope.$emit('ROTATE_RIGHT');
          }
        };

        var stopRotate = function () {
          if (state !== ROTATE_STOPPED) {
            if (state === ROTATE_UP) {
              WebLVCService.send(generateKeyPressMessage('up', false));
            }
            if (state === ROTATE_DOWN) {
              WebLVCService.send(generateKeyPressMessage('down', false));
            }
            if (state === ROTATE_LEFT) {
              WebLVCService.send(generateKeyPressMessage('left', false));
            }
            if (state === ROTATE_RIGHT) {
              WebLVCService.send(generateKeyPressMessage('right', false));
            }

            state = ROTATE_STOPPED;
            console.log('ROTATE_STOPPED');
            scope.$emit('ROTATE_STOPPED');
          }
        };

        var decideRotate = function () {

          var clientX = event.touches[0].clientX;
          var clientY = event.touches[0].clientY;
          // Canvas is nested.  Gets the offsets of <rotate-control>
          // and zoom-rotate-container.
          var offsetX = element[0].parentElement.offsetLeft + element[0].parentElement.parentElement.offsetLeft;
          var offsetY = element[0].parentElement.offsetTop + element[0].parentElement.parentElement.offsetTop;
          var elementX = clientX - offsetX;
          var elementY = clientY - offsetY;

          var oneThird = Math.floor(element.height()/3);
          var twoThirds = Math.floor(2 * element.height() / 3);

          // Top quadrant.
          if (elementY < oneThird && elementX > oneThird && elementX < twoThirds) {
            rotateUp();
          }
          // Bottom quadrant.
          else if (elementY > twoThirds && elementX > oneThird && elementX < twoThirds) {
            rotateDown();
          }
          // Left quadrant.
          else if (elementY > oneThird && elementY < twoThirds && elementX < oneThird) {
            rotateLeft();
          }
          // Right quadrant.
          else if (elementY > oneThird && elementY < twoThirds && elementX > twoThirds) {
            rotateRight();
          }
          else {
            stopRotate();
          }
        };

        canvas.addEventListener('touchstart', decideRotate);
        canvas.addEventListener('touchmove', decideRotate);
        canvas.addEventListener('touchend', stopRotate);
      }
    };
  }]);
