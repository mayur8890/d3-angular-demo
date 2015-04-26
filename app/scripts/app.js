'use strict';

/**
 * @ngdoc overview
 * @name angularD3App
 * @description
 * # angularD3App
 *
 * Main module of the application.
 */
angular
  .module('angularD3App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
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
