var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
    title: String,
    body: String,
    student: String,
    answeredBy: String,
    answer: String
});

var Question = mongoose.model('Question', questionSchema);