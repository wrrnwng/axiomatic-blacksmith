angular.module('appRoutes', [])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $stateProvider
    // home page
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'MainController'
      })
      .state('student-classroom', {
        url: '/classroom/student',
        templateUrl: 'views/student-classroom.html',
        controller: 'StudentClassroomController'
      })

  }])
  .directive('qanda', function() {
    return {
      scope: {
        questions: '=',
        askQuestion: '&'
      },
      restrict: 'E',
      templateUrl: 'views/qanda.html'
    }
  })
  .directive('queue', function() {
    return {
      scope: {
        questions: '='
      },
      restrict: 'E',
      templateUrl: 'views/queue.html'
    }
  })
  // 
  .directive('classvid', function(){
    return {
      template: 
      '<div id="vidbox"> \
        <div class="pause" ng-show="show1">PAUSE</div> \
        <div id="video"></div> \
        <input type="text" ng-model="input" ng-change="pause()"> \
        <button type="button" ng-click="play()">Submit</button> \
      </div>',
      restrict: 'E'
    }
  });