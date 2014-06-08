'use strict';

angular.module('makComponents')
  .controller('HealthAndAmmoCtrl', function ($scope, $timeout) {

   var health = 100,
       damage = 0;

   $scope.exampleData = [
     { key: 'health', y: health },
     { key: 'damage', y: damage }
   ];

   function hitEntity () {

     if (health >= 1) {

       health -= 20;
       damage += 20;

       $scope.exampleData = [
         { key: 'health', y: health },
         { key: 'damage', y: damage++ }
       ];

       $timeout(hitEntity, 700);
     }
  };

  $timeout(hitEntity, 1000);

    var colorArray = ['#000000', '#660000', '#CC0000', '#FF6666', '#FF3333', '#FF6666', '#FFE6E6'];

    $scope.colorFunction = function() {
      return function(d, i) {
          return colorArray[i];
        };
    };

    $scope.xFunction = function(){
        return function(d) {
            return d.key;
        };
    };

    $scope.yFunction = function(){
      return function(d){
        return d.y;
      };
    };

    $scope.healthAndAmmo = {

      entities : [
        { 
          name: 'tank',
          maxHealth: 1000,
          health: 900,
          maxAmmo: 3000,
          ammo: 2900
        },
        { 
          name: 'jet',
          maxHealth: 500,
          health: 500,
          maxAmmo: 1000,
          ammo: 500
        }
      ]
    };
  });
