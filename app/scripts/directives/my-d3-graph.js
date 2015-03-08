'use strict';

/**
 * @ngdoc function
 * @name angularD3App.controller:D3 Bar Graph
 * @description
 * # D3 Bar Graph
 * Controller of the angularD3App
 */
angular.module('angularD3App')
.directive('myD3Graph', function () {
	//private stuff
	var margin = {top: 0, right: 0, bottom: 0, left: 0};
	var w = 400 - margin.left - margin.right,
	h = 300 - margin.top - margin.bottom;

 	return {
 		restrict: 'E',
 		replace: true,
 		scope: { //binds scope
 			val: '='
 		},
 		template: '<div id="bar-graph"></div>',
 		link: function (scope, element, attrs) {

 			//svg obj
 			var svg = d3.select('#bar-graph').append('svg')
 			.attr('width', w + margin.left + margin.right)
 			.attr('height', h + margin.top + margin.bottom)
 			.append('g')
 			.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

 			var yScale = d3.scale.linear()
 			.domain([0, d3.max(scope.$parent.graphData)])
 			.range([0, h]);

 			var colorScale = d3.scale.quantize()
 			.domain([0, scope.$parent.graphData.length])
 			.range(['orange', 'purple', 'red', 'green']);

 			var xScale = d3.scale.ordinal()
 			.domain(scope.$parent.graphData)
 			.rangeBands([0, w], 0.1, 0);

 			svg.selectAll('rect')
 			.data(scope.$parent.graphData)
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

 			scope.$watch('val', function(newVal, oldVal) {

 				yScale = d3.scale.linear()
 				.domain([0, d3.max(newVal)])
 				.range([0, h]);
 				svg.selectAll('rect')
 				.data(newVal)
 				.transition()
 				.duration(250)
 				.delay(function (d, i) {
 					return i * 25;
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
 		}
 	};
 });