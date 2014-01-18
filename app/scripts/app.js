'use strict';

angular.module('angulatransmissionApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'angulatransmissionApp.sessions',
  'ngRoute',
  'ui.bootstrap',
  'base64'
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
