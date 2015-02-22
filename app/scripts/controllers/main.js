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
   $log.debug(WeatherDataService.getWeather('Denver'));

   $scope.searchTerm = '';
   // graph vars
   $scope.name = '';
   $scope.humidity = 10;
   $scope.pressure = 15;
   $scope.temp = 5;
   $scope.description = '';
   $scope.wind = 20;



   var graphData = [$scope.temp,  $scope.humidity, $scope.pressure, $scope.wind];

   var margin = {top: 0, right: 0, bottom: 0, left: 0};
   var w = 400 - margin.left - margin.right,
   h = 300 - margin.top - margin.bottom;

   var svg = d3.select('#bar-graph').append('svg')
   .attr('width', w + margin.left + margin.right)
   .attr('height', h + margin.top + margin.bottom)
   .append('g')
   .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

   var yScale = d3.scale.linear()
   .domain([0, d3.max(graphData)])
   .range([0, h]);

   var colorScale = d3.scale.quantize()
   .domain([0, graphData.length])
   .range(['orange', 'purple', 'red', 'green', 'black']);

   var xScale = d3.scale.ordinal()
   .domain(graphData)
   .rangeBands([0, w], 0.1, 0);

   svg.selectAll('rect')
   .data(graphData)
   .enter()
   .append('rect')
   .attr('class', 'bar')
   .attr('x', function (d) {
    return xScale(d);
  })
   .attr('y', function (d) {
    return h - yScale(d);
  })
   .attr('width', xScale.rangeBand())
   .attr('height', function (d) {
    return yScale(d);
  })
   .attr('fill', function (d, i) {
    return colorScale(i);
  });


   $scope.fakeWeather = function () {
    graphData = [$scope.temp,  $scope.humidity, $scope.pressure, $scope.wind];

    yScale = d3.scale.linear()
   .domain([0, d3.max(graphData)])
   .range([0, h]);

   colorScale = d3.scale.quantize()
   .domain([0, graphData.length])
   .range(['orange', 'purple', 'red', 'green']);

   xScale = d3.scale.ordinal()
   .domain(graphData)
   .rangeBands([0, w], 0.1, 0);

     svg.selectAll('rect')
     .data(graphData)
     .transition()
     .duration(250)
     .delay(function (d, i) {
      return i * 25;
     })
     .transition()
     .duration(250)
     .attr('x', function (d) {
      return xScale(d);
    })
     .transition()
     .duration(500)
     .attr('y', function (d) {
      return h - yScale(d);
    })
     .attr('width', xScale.rangeBand())
     .attr('height', function (d) {
      return yScale(d);
    });
   };

   $scope.searchWeather = function () {
    WeatherDataService.getWeather($scope.searchTerm)
    .then(function(data) {
     $scope.name = data.data.name;
     $scope.humidity = data.data.main.humidity;
     $scope.pressure = data.data.main.pressure;
     $scope.temp = data.data.main.temp;
     $scope.description = data.data.weather[0].description;
     $scope.wind = data.data.wind.speed;

     graphData = [$scope.temp,  $scope.humidity, $scope.pressure, $scope.wind];

     yScale = d3.scale.linear()
   .domain([0, d3.max(graphData)])
   .range([0, h]);

   colorScale = d3.scale.quantize()
   .domain([0, graphData.length])
   .range(['orange', 'purple', 'red', 'green']);

   xScale = d3.scale.ordinal()
   .domain(graphData)
   .rangeBands([0, w], 0.1, 0);

     svg.selectAll('rect')
     .data(graphData)
     .transition()
     .duration(250)
     .delay(function (d, i) {
      return i * 25;
     })
     .transition()
     .duration(250)
     .attr('x', function (d) {
      return xScale(d);
    })
     .transition()
     .duration(500)
     .attr('y', function (d) {
      return h - yScale(d);
    })
     .attr('width', xScale.rangeBand())
     .attr('height', function (d) {
      return yScale(d);
    });
   });
  };


});
