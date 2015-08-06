var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = Schema({
    title: String,
    body: String,
    answer: String,
    student: {type: Schema.Types.ObjectId, ref: 'User'},
    answeredBy: {type: Schema.Types.ObjectId, ref: 'User'},
    video: {type: Schema.Types.ObjectId, ref: 'Video'}
});

module.exports = mongoose.model('Question', questionSchema);
