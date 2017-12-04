
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// create movie activiuty schema
var movieactivitySchema = new Schema({
    category: { type: String, required: true },
    name: {type: String, required: true },
    description: {type: String},
    place: { type: String, required: true },
    date: { type: String, required: true },
    user: {type: String, required: true}
  
}, {
  versionKey: false
});

var movieActivity = mongoose.model('movieActivity', movieactivitySchema);


module.exports = movieActivity;