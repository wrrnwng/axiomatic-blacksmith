angular.module('TimelineCtrl', [])

.controller('TimelineController', function($scope, VideoFactory, qandaFactory) {
  var timelineData = [{times: []}];
  var svg;
  var chart;
  qandaFactory.getAnswers()
    .then(function(questions) {
      questions.forEach(function(question){
        timelineData[0].times.push({"starting_time": question.askQTime*1000, "ending_time": question.askQTime*1000+5000})
      });

      svg = d3.select("#timeline").append("svg").attr('width', '100%')
        .datum(timelineData).call(chart);
    });

  function timelineStackedIcons() {
    chart = d3.timeline()
      .beginning(0) // we can optionally add beginning and ending times to speed up rendering a little
      .ending(154000)
      .tickFormat({
        format: d3.time.format("%M:%S"),
        tickTime: d3.time.seconds,
        tickInterval: 30,
        tickSize: 10
      })
      .margin({left:0, right:15, top:15, bottom:0});   
    }  
   timelineStackedIcons();  
})
  .directive('timeline', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/timeline.html'
    }
  })