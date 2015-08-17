angular.module('TeacherClassroomCtrl', [])
  .controller('TeacherClassroomController', function($scope, qandaFactory, VideoFactory) {
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

    $scope.play = VideoFactory.play;

    $scope.pause = VideoFactory.pause;

    return $scope;
  })

  .controller('TeacherAnswerController', function($scope, $http, $window, VideoFactory){
    // need a current question service;
    $scope.answer = {};
    $http.get('/questions').then(function(data){
      $scope.question = data.data[data.data.length-1];
      console.log("$scope.question loaded: ")
      console.log($scope.question);
    });

    $scope.send = function(){
      $scope.question.answer = $scope.answer.text;
      $scope.question.answeredBy = $window.localStorage.getItem('com.axiomatic.id');
      $http.post('/answer',$scope.question).then(function(){console.log('Success!')});
    };

  })

  .directive('teacheranswer', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/teacher-answer.html'
    }
  })