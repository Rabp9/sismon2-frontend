'use strict';

describe('Controller: ReportesActividadesCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var ReportesActividadesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ReportesActividadesCtrl = $controller('ReportesActividadesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ReportesActividadesCtrl.awesomeThings.length).toBe(3);
  });
});
