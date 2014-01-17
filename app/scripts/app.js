'use strict';

angular.module('angulatransmissionApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'angulatransmissionApp.sessions',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
