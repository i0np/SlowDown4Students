// Instantiated Express and assigns the variable app to it.
// require('') is always used to load modules.
var express = require('express'); // Calls the express module of node.
var app = express(); // Calls the express function express(),
                    // the returned object - an Express application - is stored in the variable app

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'insert_your_database_url_here';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var path = require('path'); //Mainly used to join strings.
var bodyParser = require('body-parser') // For parsing the input of the user.
var index = require('./routes/index_routes'); // index catchs document index_routes.
var movies = require('./routes/movie_routes'); // movies catch document movie_routes.

// Enables to connect localhost on port 3000 to the application.
app.listen(3000, function(){
  console.log('Server started on port 3000...')
});

// For parsing the input of the user.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Makes rendering of views files possible, defines hbs standard.
app.set('views', path.join(__dirname, 'views'));
// Creates html language from the view files
app.set('view engine', 'hbs');
// Makes linking between views and stylesheets possible.
app.use(express.static(path.join(__dirname, 'public')));

// Routing.
app.use('/', index);
app.use('/movies', movies);