'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('angulatransmissionApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('Lipsum Test', function () {
    scope.sessionGet();
    expect(scope.session).toBe(3);
  });
});
