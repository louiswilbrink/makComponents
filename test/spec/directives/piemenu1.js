'use strict';

describe('Directive: pieMenu1', function () {

  // load the directive's module
  beforeEach(module('radialMenuApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<pie-menu1></pie-menu1>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the pieMenu1 directive');
  }));
});
