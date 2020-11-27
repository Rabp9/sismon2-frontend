'use strict';

describe('Controller: ActividadesIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var ActividadesIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActividadesIndexCtrl = $controller('ActividadesIndexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActividadesIndexCtrl.awesomeThings.length).toBe(3);
  });
});
