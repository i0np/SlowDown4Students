
var Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;

module.exports = function(appEnv) {
  // Check for the environment of DB to be connected
  if(appEnv.isLocal === true) {
    Mongoose.connect('mongodb://localhost:27017/student');
    console.log('Connected to local DB');
  } else {
    console.log('Connecting to DB in SAP cloud foundry: ' + appEnv.services.mongodb[0].credentials.uri );
    Mongoose.connect(appEnv.services.mongodb[0].credentials.uri, { useMongoClient: true });
  }
}
