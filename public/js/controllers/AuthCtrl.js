angular.module('AuthCtrl', [])

.controller('AuthCtrl', function ($rootScope, $scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (authObj) {
        $window.localStorage.setItem('com.axiomatic', authObj.token);
        $window.localStorage.setItem('com.axiomatic.name', authObj.name);
        $window.localStorage.setItem('com.axiomatic.id', authObj.id);
        $location.path('/classroom/student');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

 
  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (authObj) {
        $window.localStorage.setItem('com.axiomatic', authObj.token);
        $window.localStorage.setItem('com.axiomatic.name', authObj.name);
        $window.localStorage.setItem('com.axiomatic.id', authObj.id);
        $location.path('/classroom/student');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
   $scope.out = Auth.signout;

   $scope.isAuth = function() {
      return Auth.isAuth();
   }

  $scope.getName = function(){
    return $window.localStorage.getItem('com.axiomatic.name');
  }
 
});