'use strict';

describe('Service: trabajosService', function () {

  // load the service's module
  beforeEach(module('sismon2FrontendApp'));

  // instantiate service
  var trabajosService;
  beforeEach(inject(function (_trabajosService_) {
    trabajosService = _trabajosService_;
  }));

  it('should do something', function () {
    expect(!!trabajosService).toBe(true);
  });

});
