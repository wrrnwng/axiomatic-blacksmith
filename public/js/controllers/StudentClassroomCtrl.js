angular.module('StudentClassroomCtrl', [])
  .controller('StudentClassroomController', function($scope, qandaFactory) {
    $scope.data = {};

    $scope.tagline = 'Welcome to the classroom!';
    $scope.getQandA = function() {
      qandaFactory.getAnswers()
        .then(function(questions) {
          $scope.data.questions = questions;
        });

    };
    $scope.getQandA();
    return $scope;


  });