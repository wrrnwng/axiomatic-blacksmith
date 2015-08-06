var mongoose = require('mongoose');

var dbConnect = process.env.MONGOLAB_URI || 'mongodb://localhost/axiomatic';

mongoose.connect(dbConnect);
