'use strict';

describe('Controller: ActividadesRegistrarCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var ActividadesRegistrarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActividadesRegistrarCtrl = $controller('ActividadesRegistrarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActividadesRegistrarCtrl.awesomeThings.length).toBe(3);
  });
});
