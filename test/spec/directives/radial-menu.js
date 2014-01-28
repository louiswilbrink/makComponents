'use strict';

describe('Directive: radialMenu', function () {

  // load the directive's module
  beforeEach(module('radialMenuApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<radial-menu></radial-menu>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the radialMenu directive');
  }));
});
