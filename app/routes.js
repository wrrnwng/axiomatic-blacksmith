module.exports = function(app) {

  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // frontend routes =========================================================
  // route to handle all angular requests
  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });


  // questions (NOT answers) are posted via '/questions' route
  app.post('/questions', function(req, res) {
    var question = new QuestionModel({
      title: req.body.title,
      body: req.body.body,
      student: req.body.student,
      answeredBy: null,
      answer: null
    })

    // save the newly created model to Mongoose
    question.save(function(err, data){
      if (err) throw err;
      console.log("Saved!");
    })
  }

  //answers are posted to pre-existing question models
  app.post('/answer', function(req, res){

    // find the corresponding question by primary key
    Question.findOne( { _id : req.body.questionid } ).exec(function(err, question){
      if(err) throw err;
      question.answeredBy = req.body.teacher;
      question.answer = req.body.answer;
      question.save()
    })
};

{
  title: "What is Angular?",
  body: "etc.",
  student: "Adnan",
  answeredBy: undefined,
  answer: undefined
}