var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
    title: String,
    body: String,
    answer: String,
    student: {type: Schema.Types.ObjectId, ref: 'User'},
    answeredBy: {type: Schema.Types.ObjectId, ref: 'User'},
    video: {type: Schema.Types.ObjectId, ref: 'Video'}
});

var Question = mongoose.model('Question', questionSchema);
module.exports = Question;