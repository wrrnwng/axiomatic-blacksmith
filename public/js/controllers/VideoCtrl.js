angular.module('VideoCtrl', [])
  .factory('VideoFactory', function VideoFactory() {
    var duration,
      currentTime,
      currentTimeGetter,
      isPlaying = true,
      playCallbacks = [],
      pauseCallbacks = [],
      durationCallbacks = [];

    return {
      play: function() {
        isPlaying = true;
        playCallbacks.forEach(function(callback) {
          callback()
        });
      },
      pause: function() {
        isPlaying = false;
        pauseCallbacks.forEach(function(callback) {
          callback()
        });
      },
      playListener: function(callback) {
        playCallbacks.push(callback)
      },

      pauseListener: function(callback) {
        pauseCallbacks.push(callback)
      },
      // The duration listener will be called when the duration info is 
      // loaded; any events that require duration info should add this
      // event listener. 
      // The callback will be passed the duration.
      durationListener: function(callback) {
        durationCallbacks.push(callback)
      },

      durationReceived: function() {
        durationCallbacks.forEach(function(callback) {
          callback(duration)
        });
      },

      setCurrentTimeGetter: function(getter){
        currentTimeGetter = getter;
      },

      // currentTime: function(){
      //   if(!currentTimeGetter) throw 'No currentTime getter set!';
      //   currentTime = currentTimeGetter();
      //   return currentTime;
      // },

      isPlaying: isPlaying,

      duration: duration

    }
  })
  .controller('VideoController', function($scope, VideoFactory) {
    var wrapper = Popcorn.HTMLYouTubeVideoElement('#video');
    wrapper.src = 'https://www.youtube.com/watch?v=sh4O6DRs26M';
    var popcorn = Popcorn(wrapper);
    $scope.showPause = false;
    $scope.play = VideoFactory.play;
    $scope.pause = VideoFactory.pause;
    $scope.isPlaying = VideoFactory.isPlaying;

    popcorn.on('durationchange', function() {
      VideoFactory.duration = popcorn.duration();
      VideoFactory.durationReceived();
    })

    VideoFactory.playListener(function() {
      $scope.showPause = false;
      popcorn.play();
    });

    VideoFactory.pauseListener(function() {
      $scope.showPause = true;
      popcorn.pause();
      // return VideoFactory.currentTime = popcorn.currentTime();
    });

    VideoFactory.setCurrentTimeGetter(popcorn.currentTime);

    wrapper.addEventListener('pause', function(e) {
      VideoFactory.pause();
    });

    wrapper.addEventListener('play', function(e) {
      VideoFactory.play();
    });

    // TO-DO: refactor into setters/getters on VideoFactory
    VideoFactory.currentTime = function() {
      return popcorn.currentTime();
    };

    VideoFactory.goTo = function (seconds) {
      popcorn.play(seconds);
    };

    VideoFactory.play();

  })
  .directive('classvid', function() {
    return {
      templateUrl: 'views/classvid.html',
      restrict: 'E'
    }
  })
  .directive('teacheranswer', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/teacher-answer.html'
    }
  });