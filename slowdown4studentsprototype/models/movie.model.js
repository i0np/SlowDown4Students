
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// create movie schema
var movieSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  place: { type: String, required: true }
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

var movie = mongoose.model('movie', movieSchema);


module.exports = movie;