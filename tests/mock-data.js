var mongoose = require('mongoose');
var Question = require('../app/models/Question');
var User = require('../app/models/User');
var Video = require('../app/models/Video');

var dbConnect = process.env.MONGOLAB_URI || 'mongodb://localhost/axiomatic';

mongoose.connect(dbConnect);

User.find().remove().exec();
Video.find().remove().exec();
Question.find().remove().exec();

var adnan = new User({
  name: 'Adnan',
  role: 'teacher'
});
adnan.save();

var daniel = new User({
  name: 'Daniel',
  role: 'student'
});
daniel.save();

var mila = new User({
  name: 'Mila',
  role: 'student'
});
mila.save();

var warren = new User({
  name: 'Warren',
  role: 'student'
});
warren.save();

var codeClass = new Video({
  title: 'Code Class at Twitter',
  url: 'https://www.youtube.com/watch?v=sh4O6DRs26M'
});
codeClass.save();

var question1 = new Question({
  title: 'Why is the sky blue?',
  body: 'Seriously, why is the sky blue?',
  answer: 'Because...',
  student: warren._id,
  answeredBy: adnan._id,
  video: codeClass._id,
  askQTime: 30
});
question1.save();

var question2 = new Question({
  title: 'Why is sun yellow?',
  body: 'Whay is it changing colors from red to yellow?',
  answer: 'Only god knows',
  student: daniel._id,
  answeredBy: adnan._id,
  video: codeClass._id,
  askQTime: 5
});

question2.save();

var question3 = new Question({
  title: 'Why is Tony selling sharks?',
  body: '...and how are they so cheap?',
  student: daniel._id,
  video: codeClass._id,
  askQTime: 50
});

question3.save();

mongoose.connection.close();