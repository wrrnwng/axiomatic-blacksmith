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
      .state('teacher-classroom', {
        url: '/classroom/teacher',
        templateUrl: 'views/teacher-classroom.html',
        controller: 'StudentClassroomController'
      })


  }])
  .directive('qanda', function() {
    return {
      scope: {
        questions: '='
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
  .directive('teacheranswer', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/teacher-answer.html'
    }
  })
  // 
  .directive('classvid', function(){
    return {
      template: 
      '<div id="vidbox"> \
        <div class="pause" ng-show="show1">PAUSE</div> \
        <div id="video"></div> \
      </div>',
      restrict: 'E'
    }
  });