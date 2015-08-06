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