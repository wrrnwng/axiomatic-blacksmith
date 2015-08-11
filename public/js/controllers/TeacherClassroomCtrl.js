angular.module('TeacherClassroomCtrl', [])
  .controller('TeacherClassroomController', function($scope, qandaFactory) {
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
  })

  .controller('TeacherAnswerController', function($scope, $http){
    // need a current question service;
    $scope.answer = {};
    $scope.send = function(){
      $http.post('/answer',$scope.answer).then(function(){console.log('Success!')});
    }
  })