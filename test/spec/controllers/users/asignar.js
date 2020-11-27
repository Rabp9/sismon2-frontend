'use strict';

describe('Controller: UsersAsignarCtrl', function () {

  // load the controller's module
  beforeEach(module('sismon2FrontendApp'));

  var UsersAsignarCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UsersAsignarCtrl = $controller('UsersAsignarCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UsersAsignarCtrl.awesomeThings.length).toBe(3);
  });
});
