'use strict';

angular.module('angulatransmissionApp', [
  'angulatransmissionApp.sessions',
  'ngRoute',
  'ui.bootstrap',
  'base64',
  'ngStorage',
  'ngSanitize'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).otherwise({
        redirectTo: '/'
      });
  });
