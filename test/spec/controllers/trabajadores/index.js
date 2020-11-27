'use strict';

describe('Controller: TrabajadoresIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var TrabajadoresIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrabajadoresIndexCtrl = $controller('TrabajadoresIndexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TrabajadoresIndexCtrl.awesomeThings.length).toBe(3);
  });
});
