var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = Schema({
    title: String,
    url: String
});

module.exports = mongoose.model('Video', videoSchema);