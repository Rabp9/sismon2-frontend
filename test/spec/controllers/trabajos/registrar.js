'use strict';

describe('Controller: TrabajosRegistrarCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var TrabajosRegistrarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrabajosRegistrarCtrl = $controller('TrabajosRegistrarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TrabajosRegistrarCtrl.awesomeThings.length).toBe(3);
  });
});
