var express = require('express');
var app = express();
var path = require('path');
var db = require('./db'); // Getting access to db file.
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

// The url localhost:3000/database shows how data is fetched from the database as json.
app.get('/database', function(req, res) {
  db.query("SELECT title, name FROM movie", function(error, rows, fields) {
      if (error) {
          console.log('Error in query');
      } else {
        console.log('parse the fields', rows);
        res.json(rows);
      }
  });
})