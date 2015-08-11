angular.module('VideoCtrl', [])
  .controller('VideoController', function($scope){
    var wrapper = Popcorn.HTMLYouTubeVideoElement('#video');
    wrapper.src = 'https://www.youtube.com/watch?v=sh4O6DRs26M';
    var popcorn = Popcorn(wrapper);

    $scope.show = false;

    $scope.input = '';

    $scope.pause = function(){
      $scope.show = true;
      popcorn.pause(); 
    }
    $scope.play = function(){
      $scope.input = '';
      popcorn.play();
    }

    popcorn.play();

  })