'use strict';

describe('Controller: ActividadestiposIndexCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var ActividadestiposIndexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActividadestiposIndexCtrl = $controller('ActividadestiposIndexCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActividadestiposIndexCtrl.awesomeThings.length).toBe(3);
  });
});
