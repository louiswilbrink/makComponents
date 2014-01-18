'use strict';

describe('Directive: dataExamples', function () {

  // load the directive's module
  beforeEach(module('radialMenuApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<data-examples></data-examples>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the dataExamples directive');
  }));
});
