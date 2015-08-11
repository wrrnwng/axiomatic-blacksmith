angular.module('StudentClassroomCtrl', [])
  .controller('StudentClassroomController', function($scope, qandaFactory, questionFormFactory) {
    $scope.data = {};
    $scope.question = '';

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

    $scope.askQuestion = function () {
      questionFormFactory.submitQuestion({
        title: $scope.question,
        body: $scope.question
      });
      $scope.question = '';
    };

    $scope.getQandA();
    return $scope;


  })
  .controller('VideoController', function($scope){
    var wrapper = Popcorn.HTMLYouTubeVideoElement('#video');
    wrapper.src = 'https://www.youtube.com/watch?v=sh4O6DRs26M';
    var popcorn = Popcorn(wrapper);

    $scope.show = false;

    $scope.input = '';

    $scope.pause = function(){
      $scope.show = true;
      popcorn.pause(); 
    }
    $scope.play = function(){
      $scope.input = '';
      popcorn.play();
    }

    popcorn.play();

  });