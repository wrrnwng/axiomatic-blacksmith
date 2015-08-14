angular.module('TimelineCtrl', [])

.controller('TimelineController', function($scope, VideoFactory, qandaFactory, $interval) {
  $scope.progress = 0;
  $scope.duration;
  $interval(function() {
    if ($scope.duration) {
      $scope.progress = VideoFactory.currentTime() / VideoFactory.duration * 100;
    } else {
      if (VideoFactory.duration) {
        $scope.duration = VideoFactory.duration;
      }
    }
  }, 1000);
})
.directive('timeline', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/timeline.html'
  }
})
.directive('progressBar', function() {
  function link(scope, el, attr) {
    el = el[0];
    var width = 640;
    var height = 20;
    var svg = d3.select(el).append('svg')
      .attr({
        width: width,
        height: height
      });

    var rect = svg.append('rect').style('fill', 'blue');

    scope.$watch('progress', function(progress) {
      rect.attr({
        x: 0,
        y: 0,
        width: width * progress / 100,
        height: height
      });
    });
  }

  return {
    link: link,
    restrict: 'E',
    scope: { progress: '='}
  };
})
.directive('currentQuestion', function() {
  return {
    template: ''
  }
});

