var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
    title: String,
    url: String
});

module.exports = mongoose.model('Video', videoSchema);