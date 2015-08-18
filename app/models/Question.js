var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = Schema({
    title: String,
    body: String,
    answer: String,
    student: {type: Schema.Types.ObjectId, ref: 'User'},
    answeredBy: {type: Schema.Types.ObjectId, ref: 'User'},
    video: {type: Schema.Types.ObjectId, ref: 'Video'},
    askQTime: Number,
    created_at: {type: Date},
    updated_at: {type: Date}
});

questionSchema.pre('save', function(next) {
  var now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

module.exports = mongoose.model('Question', questionSchema);
