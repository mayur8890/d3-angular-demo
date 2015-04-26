'use strict';

/**
 * @ngdoc function
 * @name angularD3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularD3App
 */
 angular.module('angularD3App')
 .controller('MainCtrl', function ($scope, WeatherDataService, $log) {

   $scope.searchTerm = '';
   // graph vars
   $scope.name = '';
   $scope.humidity = 10;
   $scope.pressure = 15;
   $scope.temp = 5;
   $scope.description = '';
   $scope.wind = 20;

   $scope.graphData = [$scope.temp,  $scope.humidity, $scope.pressure, $scope.wind];
   
   $scope.fakeWeather = function () {
    $scope.graphData = [$scope.temp,  $scope.humidity, $scope.pressure, $scope.wind];
  };

  $scope.searchWeather = function () {
    WeatherDataService.getWeather($scope.searchTerm)
    .then(function(data) {
     $log.debug(data.data);
     $scope.name = data.data.name;
     $scope.humidity = data.data.main.humidity;
     $scope.pressure = data.data.main.pressure;
     $scope.temp = data.data.main.temp;
     $scope.description = data.data.weather[0].description;
     $scope.wind = data.data.wind.speed;

     $scope.graphData = [$scope.temp,  $scope.humidity, $scope.pressure, $scope.wind];
       });
    };
});
