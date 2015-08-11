angular.module('VideoCtrl', [])
  .controller('VideoController', function($scope) {
    var wrapper = Popcorn.HTMLYouTubeVideoElement('#video');
    wrapper.src = 'https://www.youtube.com/watch?v=sh4O6DRs26M';
    var popcorn = Popcorn(wrapper);
    popcorn.cue(1, function() {
      console.log(this.duration());
    });

    $scope.show = false;


    $scope.input = '';
    var currentTime;

    $scope.pause = function() {
      $scope.show = true;
      popcorn.pause();
      currentTime = popcorn.currentTime();

    }
    $scope.submitQ = function() {
      $scope.input = '';
      popcorn.play();
      console.log(currentTime);
    }
    popcorn.play();

  })