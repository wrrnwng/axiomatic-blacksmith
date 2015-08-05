var mongoose = require('mongoose');

var videoSchema = mongoose.Schema({
    title: String,
    url: String
});

var Video = mongoose.model('Video', videoSchema);