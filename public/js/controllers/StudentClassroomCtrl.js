angular.module('StudentClassroomCtrl', [])
  .controller('StudentClassroomController', function($scope, qandaFactory, questionFormFactory, VideoFactory) {
    $scope.data = {};
    $scope.question = '';

    $scope.tagline = 'Welcome to the classroom!';
    $scope.getQandA = function() {
      qandaFactory.getAnswers()
        .then(function(questions) {
          $scope.data.questions = questions;
          $scope.data.answeredQuestions = questions.filter(function(question) {
            return !!question.answer;
          });
          $scope.data.questionQueue = questions.filter(function(question) {
            return !question.answer;
          });
        });
    };

    $scope.askQuestion = function() {
      questionFormFactory.submitQuestion({
        title: $scope.question,
        body: $scope.question
      });
      $scope.question = '';
      VideoFactory.play();
    };

    $scope.pause = VideoFactory.pause

    $scope.getQandA();
    return $scope;

  });