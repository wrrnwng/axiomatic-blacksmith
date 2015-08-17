angular.module('TeacherClassroomCtrl', [])
  .controller('TeacherClassroomController', function($scope, qandaFactory, VideoFactory, socketFactory) {
    $scope.data = {};
    $scope.tagline = 'Welcome to the classroom!';

    $scope.getQandA = function() {
      qandaFactory.getAnswers()
        .then(function(questions) {
          $scope.data.questions = questions;
          console.log($scope.data.questions);
          $scope.data.answeredQuestions = questions.filter(function (question) {
            return !!question.answer;
          });
          $scope.data.questionQueue = questions.filter(function (question) {
            return !question.answer;
          });
          socketFactory.socket.on('new-question', function (question) {
            $scope.data.questionQueue.push(question);
          });
          socketFactory.socket.on('answered-question', function (question) {
            $scope.data.answeredQuestions.push(question);
            var queue = $scope.data.questionQueue
            for (var i = 0; i < queue.length; i++) {
              console.log(queue[i]._id, question._id);
              if (queue[i]._id === question._id) {
                queue.splice(i, 1);
                break;
              }
            }
          });
        });
    };
    $scope.getQandA();

    $scope.play = VideoFactory.play;

    $scope.pause = VideoFactory.pause;

    return $scope;

  })


  .controller('TeacherAnswerController', function($scope, $http, $window, VideoFactory, socketFactory){
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
      $http.post('/answer',$scope.question);
      VideoFactory.play();
      socketFactory.socket.emit('answered-question', {
        _id: $scope.question._id,
        title: $scope.question.title,
        body: $scope.question.body,
        student: $scope.question.student,
        askQTime: $scope.question.askQTime,
        answer: $scope.question.answer,
        answeredBy: {name: $window.localStorage.getItem('com.axiomatic.name')}
      });
    };

  })

  .directive('teacheranswer', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/teacher-answer.html'
    }
  })
  