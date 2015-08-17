angular.module('axiomatic.services', [])
  .filter('secondsToDateTime', [function() {
      return function(seconds) {
          return new Date(1970, 0, 1).setSeconds(seconds);
      };
  }])
  .factory('qandaFactory', function($http) {
    var getAnswers = function() {
      return $http({
          method: 'GET',
          url: '/questions'
        })
        .then(function(resp) {
          return resp.data;
        });
    }
    return {
      getAnswers: getAnswers
    }
  })
  .factory('questionFormFactory', function ($http) {
    var checkUser = function (username) {
      return $http({
        method: 'GET',
        url: '/users?name=' + username
      })
      .then(function (resp) {
        return resp.data;
      });
    }

    var submitQuestion = function (question) {
      return $http({
          method: 'POST',
          url: '/questions',
          data: question
        })
        .then(function(resp) {
          return resp.data;
        });
    }
    return {
      submitQuestion: submitQuestion,
      checkUser: checkUser
    }
  })
  .factory('socketFactory', function () {
    var socket = io.connect('http://127.0.0.1:8080');
    return {
      socket: socket
    };
  })

  .factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/signin',
      data: user
    })
    .then(function (resp) {
      return {token: resp.data.token, name: resp.data.name, id: resp.data.id};
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
    .then(function (resp) {
      return {token: resp.data.token, name: resp.data.name, id: resp.data.id};
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.axiomatic');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.axiomatic');
    $window.localStorage.removeItem('com.axiomatic.id');
    $window.localStorage.removeItem('com.axiomatic.name');



    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});

