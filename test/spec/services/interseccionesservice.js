'use strict';

describe('Service: interseccionesService', function () {

  // load the service's module
  beforeEach(module('sismon2FrontendApp'));

  // instantiate service
  var interseccionesService;
  beforeEach(inject(function (_interseccionesService_) {
    interseccionesService = _interseccionesService_;
  }));

  it('should do something', function () {
    expect(!!interseccionesService).toBe(true);
  });

});
