'use strict';

describe('Controller: TrabajadoresAddCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var TrabajadoresAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrabajadoresAddCtrl = $controller('TrabajadoresAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TrabajadoresAddCtrl.awesomeThings.length).toBe(3);
  });
});
