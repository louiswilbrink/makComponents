'use strict';

describe('Directive: barGraphDeux', function () {

  // load the directive's module
  beforeEach(module('radialMenuApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bar-graph-deux></bar-graph-deux>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the barGraphDeux directive');
  }));
});
