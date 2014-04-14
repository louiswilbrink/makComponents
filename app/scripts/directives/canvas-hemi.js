'use strict';

angular.module('makComponents')
  .directive('canvasHemi', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        console.log(attrs);

        attrs.state = 'louis';

        //$attributes.$observe('myOtherAttribute', function(newValue))
        
        var TOUCH_NONE, state = 0;
        var TOUCH_TOP = 1;
        var TOUCH_BOTTOM = 2;

        var canvas = element[0];

        // Stop all browser default behavior (scroll, hold, zoom, etc).
        Hammer(canvas).on('hold drag dragdown dragup swipe swipeup swipedown', function (ev) {
          ev.gesture.preventDefault();
        });

        var setTouchLocation = function setTouchLocation () {

          console.log('touchin');
        };

        var setNoTouch = function setNoTouch() {

          console.log('no touch');
        };

        canvas.addEventListener('touchstart', setTouchLocation);
        canvas.addEventListener('touchmove', setTouchLocation);
        canvas.addEventListener('touchend', setNoTouch);
      }
    };
  });
