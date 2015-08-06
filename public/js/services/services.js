angular.module('axiomatic.services', [])
  .factory('qandaFactory', function($http) {
    var getAnswers = function() {
      return $http({
          method: 'GET',
          url: '/questions'
        })
        .then(function(resp) {
          return resp.data;
        });
    }
    return {
      getAnswers: getAnswers
    }
  });