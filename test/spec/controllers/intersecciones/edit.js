'use strict';

describe('Controller: InterseccionesEditCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var InterseccionesEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InterseccionesEditCtrl = $controller('InterseccionesEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InterseccionesEditCtrl.awesomeThings.length).toBe(3);
  });
});
