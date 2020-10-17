'use strict';

describe('Controller: InterseccionesIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var InterseccionesIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InterseccionesIndexCtrl = $controller('InterseccionesIndexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InterseccionesIndexCtrl.awesomeThings.length).toBe(3);
  });
});
