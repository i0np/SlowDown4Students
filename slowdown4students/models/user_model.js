
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// create movie schema
var userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true},
  lastname: { type: String, required: true},
  email: { type: String, required: true},
  university: {type: String, required: true},
  immatriculation_number: { type: Number, required: true},
  
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

var user = mongoose.model('user', userSchema);


module.exports = user;