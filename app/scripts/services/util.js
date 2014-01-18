'use strict';

angular.module('radialMenuApp')
  .service('Util', function Util() {

    return {

      randomNumberBetween : function (min,max) {

        return (Math.round((max-min) * Math.random() + min));
      },

      getArrayOfRandomNumbers : function (length, min, max) {

        var randomArray = [];

        for (var i = 0; i < length; i++) {

          randomArray.push(this.randomNumberBetween(min, max));
        }

        return randomArray;
      }
    }
  });
