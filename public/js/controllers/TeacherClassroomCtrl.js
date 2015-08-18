angular.module('TeacherClassroomCtrl', [])

  .factory('CurrentQuestionFactory', function($rootScope){
    var currentQ = null;
    $rootScope.show = false;
    $rootScope.currentQuestion = null; 

    return {
      currentQuestion : function(question) {$rootScope.currentQuestion = question},
      show : function(){$rootScope.show = true},
      hide: function(){$rootScope.show = false}
    }
  })
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


  .controller('TeacherAnswerController', function($scope, $rootScope, $http, $window, VideoFactory, socketFactory, CurrentQuestionFactory){
    // need a current question service;

    $scope.answer = {};
    $scope.question = null;
    $scope.show = false;
    $scope.$watch(function(){return $rootScope.show},function(){
      $scope.show = $rootScope.show;
    });
    $scope.$watch(function(){return $rootScope.currentQuestion},function(){
      $scope.question = $rootScope.currentQuestion;
    });


    $scope.send = function(){
      $scope.question.answer = $scope.answer.text;
      $scope.question.answeredBy = $window.localStorage.getItem('com.axiomatic.id');
      $http.post('/answer',$scope.question).then(function (answeredQuestion) {
        socketFactory.socket.emit('answered-question', answeredQuestion.data);
      });
      CurrentQuestionFactory.hide();
      VideoFactory.play();
    };

  })

  .directive('teacheranswer', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/teacher-answer.html'
    }
  })
  