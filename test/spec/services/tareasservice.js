'use strict';

describe('Service: tareasService', function () {

  // load the service's module
  beforeEach(module('sismon2FrontendApp'));

  // instantiate service
  var tareasService;
  beforeEach(inject(function (_tareasService_) {
    tareasService = _tareasService_;
  }));

  it('should do something', function () {
    expect(!!tareasService).toBe(true);
  });

});
