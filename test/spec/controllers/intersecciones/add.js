'use strict';

describe('Controller: InterseccionesAddCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var InterseccionesAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InterseccionesAddCtrl = $controller('InterseccionesAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InterseccionesAddCtrl.awesomeThings.length).toBe(3);
  });
});
