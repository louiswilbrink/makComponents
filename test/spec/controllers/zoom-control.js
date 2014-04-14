'use strict';

describe('Controller: ZoomControlCtrl', function () {

  // load the controller's module
  beforeEach(module('radialMenuApp'));

  var ZoomControlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ZoomControlCtrl = $controller('ZoomControlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
