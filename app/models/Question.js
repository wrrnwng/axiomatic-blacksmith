var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
    title: String,
    body: String,
    answer: String,
    student: {type: Schema.Types.ObjectId, ref: 'User'},
    answeredBy: {type: Schema.Types.ObjectId, ref: 'User'},
    video: {type: Schema.Types.ObjectId, ref: 'Video'}
});

module.exports = mongoose.model('Question', questionSchema);
