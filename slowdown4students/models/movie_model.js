
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// create movie schema
var movieSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  place: { type: String, required: true },
  date: { type: Date, required: true}
}, {
  versionKey: false
});

var movie = mongoose.model('movie', movieSchema);


module.exports = movie;