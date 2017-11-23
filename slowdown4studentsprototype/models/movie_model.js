
var Mongoose = require('mongoose'),
Schema = Mongoose.Schema;

// create movie schema
var MovieSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  place: { type: String, required: true },
  date: Date
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

var Movie = Mongoose.model('movie', MovieSchema);


module.exports = Movie;