//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    immatriculation_number: { type: Number, required: true},
    password: { type: String, required: true},
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true},
    phone_number: {type: Number, required:true},
    university: {type: String, required: true},
});

module.exports = mongoose.model('MovieActivity', MovieActivitySchema );


