'use strict';

describe('Controller: ActividadesEditTareaCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var ActividadesEditTareaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActividadesEditTareaCtrl = $controller('ActividadesEditTareaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActividadesEditTareaCtrl.awesomeThings.length).toBe(3);
  });
});
