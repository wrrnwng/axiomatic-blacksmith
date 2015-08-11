var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = Schema({
  title: String,
  url: String,
  duration: Number
});

module.exports = mongoose.model('Video', videoSchema);