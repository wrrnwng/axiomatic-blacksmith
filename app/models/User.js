var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    role: String
});

module.exports = mongoose.model('User', userSchema);