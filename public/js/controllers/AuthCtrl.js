angular.module('AuthCtrl', [])

.controller('AuthCtrl', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.axiomatic', token);
        $location.path('/classroom/student');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

 
  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.axiomatic', token);
        $location.path('/classroom/student');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
   $scope.out = Auth.signout;
 
});