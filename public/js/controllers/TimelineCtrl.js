angular.module('TimelineCtrl', [])

.controller('TimelineController', function($scope, TimelineFactory) {
  $scope.playPause = function() {
    
  };
})

.directive('timeline', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/timeline.html'
  }
})

.factory('TimelineFactory', function($scope, VideoFactory) {

    if (VideoFactory.isPlaying) {
      VideoFactory.pause();
    } else {
      VideoFactory.play();
    }

});