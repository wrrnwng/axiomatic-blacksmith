angular.module('TimelineCtrl', [])

.controller('TimelineController', function($scope, VideoFactory, qandaFactory) {
  var videoWidth = 640;
  var barHeight = 20;
  var progress = d3.select("#timeline").append("svg:svg")
    .attr('id', 'play-svg')
    .attr('width', videoWidth)
    .attr('height', barHeight);
  progress.append("rect")
    .attr("id","progress-bar")
    .attr("width", videoWidth)
    .attr("height", barHeight)
    .attr("x",0)
    .attr("y",0);
  var timelineData = [{times: []}];
  var svg;
  var chart;
       qandaFactory.getAnswers()
        .then(function(questions) {
          questions.forEach(function(question){
            timelineData[0].times.push({"starting_time": question.askQTime*1000, "display": "circle"})
          })

           svg = d3.select("#timeline").append("svg").attr("width", '640')
           .datum(timelineData).call(chart);
          });

   
  //  timelineData = [
  //   {times: [
  //     // {"starting_time": 0, "ending_time": 10}, 
  //     // {"starting_time": 5500, "ending_time": 10500},
  //     // {"starting_time": 35500, "ending_time": 40500},
  //     // {"starting_time": 85500, "ending_time": 90500},
  //     // {"starting_time": 153990, "ending_time": 154000}
  //     ]},
  // ];

    function timelineStackedIcons() {
    chart = d3.timeline()
      .beginning(0) // we can optionally add beginning and ending times to speed up rendering a little
      .ending(154000)
      .tickFormat( //
        {format: d3.time.format("%M:%S"),
        tickTime: d3.time.seconds,
        tickInterval: 30,
        tickSize: 10})
      .margin({left:0, right:0, top:15, bottom:0})
      ;
   
  }  
   timelineStackedIcons();  
})
  .directive('timeline', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/timeline.html'
    }
  })