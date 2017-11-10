//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var MovieActivityTypeSchema = new Schema({
    category: { type: String, required: true},
});

module.exports = mongoose.model('MovieActivtyType', MovieActivityTypeSchema );
