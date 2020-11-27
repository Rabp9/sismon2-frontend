'use strict';

describe('Controller: TrabajadoresViewCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var TrabajadoresViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrabajadoresViewCtrl = $controller('TrabajadoresViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TrabajadoresViewCtrl.awesomeThings.length).toBe(3);
  });
});
