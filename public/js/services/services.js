angular.module('axiomatic.services', [])
  .factory('AnsweredQuestions', function($http) {
      var getAnswers = function() {
        return $http({
            method: 'GET',
            url: '/questions'
          })
          .then(function(resp) {
            return resp.data;
          });
        return {
          getAnswers;
        }
      })