//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true}
    university: {type: Schema.ObjectId, ref: 'MovieTypeSchema', required: true},
    immatriculation_number: { type: Number, required: true},
});

module.exports = mongoose.model('MovieActivity', MovieActivitySchema );


