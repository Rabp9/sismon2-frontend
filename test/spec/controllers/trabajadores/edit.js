'use strict';

describe('Controller: TrabajadoresEditCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var TrabajadoresEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrabajadoresEditCtrl = $controller('TrabajadoresEditCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TrabajadoresEditCtrl.awesomeThings.length).toBe(3);
  });
});
