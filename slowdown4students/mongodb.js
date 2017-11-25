
var Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost:27017/student'); 
var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'Error in MongoDB connection'));
db.once('open', function callback() {
  console.log('Successfully connected to MongoDB');
});

exports.db = db;