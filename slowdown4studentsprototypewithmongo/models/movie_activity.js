//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var MovieActivitySchema = new Schema({
    type: {type: Schema.ObjectId, ref: 'MovieActivityTypeSchema', required: true},
    place: { type: String, required: true},
    time: { type: Date, required: true}, 
});

module.exports = mongoose.model('MovieActivity', MovieActivitySchema );


    