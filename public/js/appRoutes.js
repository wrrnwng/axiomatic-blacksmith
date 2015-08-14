angular.module('appRoutes', [])
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

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
        controller: 'StudentClassroomController',
        authenticate: true,
      })
      .state('teacher-classroom', {
        url: '/classroom/teacher',
        templateUrl: 'views/teacher-classroom.html',
        controller: 'StudentClassroomController',
        authenticate: true,
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'views/signin.html',
        controller: 'AuthCtrl',

      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'AuthCtrl'
      })
      // .state('logout', {
      //   url: '/logout',
      //   controller: function($scope, $route) {
      //     $route.reload()
      //   }
      // })

      $httpProvider.interceptors.push('AttachTokens');
    }])
    .factory('AttachTokens', function ($window) {
    // this is an $httpInterceptor
    // its job is to stop all out going request
    // then look in local storage and find the user's token
    // then add it to the header so the server can validate the request
    var attach = {
      request: function (object) {
        var jwt = $window.localStorage.getItem('com.axiomatic');
        if (jwt) {
          object.headers['x-access-token'] = jwt;
        }
        object.headers['Allow-Control-Allow-Origin'] = '*';
        return object;
      }
    };
    return attach;
  })
  .run(function($state, $rootScope, Auth) {
    // here inside the run phase of angular, our services and controllers
    // have just been registered and our app is ready
    // however, we want to make sure the user is authorized
    // we listen for when angular is trying to change routes
    // when it does change routes, we then look for the token in localstorage
    // and send that token to the server to see if it is a real user or hasn't expired
    // if it's not valid, we then redirect back to signin/signup
    $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
       if (toState.authenticate && !Auth.isAuth()) {
           e.preventDefault();
           $state.go('signin');
       }  
    });
  })

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
  