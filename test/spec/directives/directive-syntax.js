'use strict';

describe('Directive: directiveSyntax', function () {

  // load the directive's module
  beforeEach(module('radialMenuApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<directive-syntax></directive-syntax>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the directiveSyntax directive');
  }));
});
