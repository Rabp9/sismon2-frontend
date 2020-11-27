'use strict';

describe('Service: actividadesService', function () {

  // load the service's module
  beforeEach(module('sismon2FrontendApp'));

  // instantiate service
  var actividadesService;
  beforeEach(inject(function (_actividadesService_) {
    actividadesService = _actividadesService_;
  }));

  it('should do something', function () {
    expect(!!actividadesService).toBe(true);
  });

});
