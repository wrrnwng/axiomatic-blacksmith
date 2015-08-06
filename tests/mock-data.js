var mongoose = require('mongoose');
var Question = require('../app/models/Question');
var User = require('../app/models/User');
var Video = require('../app/models/Video');


mongoose.connect('mongodb://localhost/axiomatic');

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

console.log(warren);

var question1 = new Question({
    title: 'Why is the sky blue?',
    body: 'Seriously, why is the sky blue?',
    answer: 'Because...',
    student: warren._id,
    answeredBy: adnan._id,
    video: codeClass._id
});
question1.save();

mongoose.connection.close();
