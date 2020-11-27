'use strict';

describe('Controller: ActividadestiposAddCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var ActividadestiposAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActividadestiposAddCtrl = $controller('ActividadestiposAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ActividadestiposAddCtrl.awesomeThings.length).toBe(3);
  });
});
