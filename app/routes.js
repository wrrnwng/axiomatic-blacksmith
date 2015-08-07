module.exports = function(app) {
  // import mongoose model for Questions
  var Question = require('./models/Question');
  var User = require('./models/User');


  // Express routing service for get and post requests

  app.get('/users', function (req, res) {
    if (req.body.name) {
      var users = User.findOne({name: name})
        .exec(function (err, data) {
          if (err) throw err;
          res.send(data);
        });
    } else {
      var users = User.find({})
        .exec(function (err, data) {
          if (err) throw err;
          res.send(data);
        });
    }
  });


  // Returns array of objects;
  // To access name, you'll need to 
  // access item.name (for item in data)
  app.get('/questions', function(req, res) {
    var questions = Question.find({})
      .populate('student')
      .exec(function(err, data){
        if(err) throw err;
        res.send(data);
      });
  });

  // questions (NOT answers) are posted via '/questions' route
  app.post('/questions', function(req, res) {
    var question = new Question({
      title: req.body.title,
      body: req.body.body,
      student: req.body.student,
      answeredBy: null,
      answer: null
    });

    // save the newly created model to Mongoose
    question.save(function(err, data){
      if (err) throw err;
      res.send(201);
    });
  });

  // answers are posted to pre-existing question models;
  // Lookup is done by ObjectId (use just the alphanumeric string
  // ie: '5555ad2...',   NOT   ObjectID('5555ad2....') )
  app.post('/answer', function(req, res){
    // find the corresponding question by primary key
    Question.findOne( { _id : req.body.questionid }, function(err, question){
      if(err) throw err;
      question.answeredBy = req.body.answeredBy;
      question.answer = req.body.answer;
      question.save();
      // TODO: come back and redirect
      res.send(201,'Success!\n');
    });
  });
}