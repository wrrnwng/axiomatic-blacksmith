angular.module('StudentClassroomCtrl', [])
  .controller('StudentClassroomController', function($scope, qandaFactory) {
    $scope.data = {};

    $scope.tagline = 'Welcome to the classroom!';
    $scope.getQandA = function() {
      qandaFactory.getAnswers()
        .then(function(questions) {
          $scope.data.questions = questions;
          $scope.data.answeredQuestions = questions.filter(function (question) {
            return !!question.answer;
          });
          $scope.data.questionQueue = questions.filter(function (question) {
            return !question.answer;
          });
        });
    };
    $scope.getQandA();
    return $scope;


  });