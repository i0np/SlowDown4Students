var express = require('express');
var app = express();
var path = require('path');

var index = require('./routes/indexRoutes');
var movies = require('./routes/movieRoutes');

// enables to connect localhost on port 3000
app.listen(3000, function(){
  console.log('Server started on port 3000...')
});

// makes rendering of views files possible, defines hbs standard
app.set('views', path.join(__dirname, 'views'));
// creates html language from the view files
app.set('view engine', 'hbs');
// makes linking between views and stylesheets possible
app.use(express.static(path.join(__dirname, 'public')));

// routing
app.use('/', index);
app.use('/movies', movies);
