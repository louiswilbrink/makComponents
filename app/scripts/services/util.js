'use strict';

angular.module('makComponents')
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
      },

      getArrayOfRandomPairs : function () {

        // 50 Pairs ranging from [0, 0] to [1000, 1000]

        var dataset = [];
        var numDataPoints = 50;
        var xRange = Math.random() * 1000;
        var yRange = Math.random() * 1000;
        for (var i = 0; i < numDataPoints; i++) {
            var newNumber1 = Math.floor(Math.random() * xRange);
            var newNumber2 = Math.floor(Math.random() * yRange);
            dataset.push([newNumber1, newNumber2]);
          }

        return dataset;
      }
    }
  });
