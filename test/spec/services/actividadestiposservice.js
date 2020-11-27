'use strict';

describe('Service: actividadesTiposService', function () {

  // load the service's module
  beforeEach(module('sismon2FrontendApp'));

  // instantiate service
  var actividadesTiposService;
  beforeEach(inject(function (_actividadesTiposService_) {
    actividadesTiposService = _actividadesTiposService_;
  }));

  it('should do something', function () {
    expect(!!actividadesTiposService).toBe(true);
  });

});
