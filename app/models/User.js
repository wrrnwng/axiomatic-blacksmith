var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    role: String
});

var User = mongoose.model('User', userSchema);