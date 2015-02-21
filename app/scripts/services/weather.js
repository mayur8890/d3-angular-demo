'use strict';

/**
 * @ngdoc function
 * @name angularD3App.controller:WeatherService
 * @description
 * # WeatherService
 * Controller of the angularD3App
 */
angular.module('angularD3App')
  .factory('WeatherDataService', function ($http, $q, $log) {
  	return {
  		getWeather: function(searchTerm) {
  			var deferred = $q.defer();
  			$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + '&units=imperial')
  			.success(function (data) {
  				deferred.resolve({
  					data: data
  				});
  			}).error(function(msg, code) {
  				deferred.reject(msg);
  				$log.error(msg, code);
  			});
  			return deferred.promise;
  		}
  	};
  });
