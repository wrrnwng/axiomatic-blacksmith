angular.module('StudentClassroomCtrl', [])
  .controller('StudentClassroomController', function($scope, $window, qandaFactory, questionFormFactory, VideoFactory, socketFactory) {
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
          socketFactory.socket.on('new-question', function (question) {
            $scope.data.questionQueue.push(question);
          });
          socketFactory.socket.on('answered-question', function (question) {
            $scope.data.answeredQuestions.push(question);
            var queue = $scope.data.questionQueue
            for (var i = 0; i < queue.length; i++) {
              if (queue[i]._id === question._id) {
                queue.splice(i, 1);
                break;
              }
            }
          });
        });
    };

    $scope.askQuestion = function() {
      var data = {
        title: $scope.question,
        body: $scope.question,
        student: $window.localStorage.getItem('com.axiomatic.id'),
        askQTime: VideoFactory.currentTime()
      };
      questionFormFactory.submitQuestion(data).then(function (newQuestion) {
        socketFactory.socket.emit('new-question', newQuestion);
      })
      $scope.question = '';
      VideoFactory.play();
    };

    $scope.pause = VideoFactory.pause

    $scope.getQandA();
 
    return $scope;

  });