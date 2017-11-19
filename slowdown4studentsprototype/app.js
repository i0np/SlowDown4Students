var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser') // For parsing the input of the user.
var index = require('./routes/index_routes'); // index catchs document index_routes.
var mongo = require('./mongodb');
var router = express.Router();
var movie = require('./routes/movie.route');

// Makes rendering of views files possible, defines hbs standard.
app.set('views', path.join(__dirname, 'views'));
// Creates html language from the view files
app.set('view engine', 'hbs');


app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Makes linking between views and stylesheets possible.
app.use(express.static(path.join(__dirname, 'public')));


// Routing.
app.use('/', index);
app.use('/movie', movie);

app.get('/movie/add',function(req, res) {
  res.render('addMovie', {
      title:'Add Movie'
  });
}); 

// Enables to connect localhost on port 3000 to the application.
app.listen(3000, function(){
  console.log('Server started on port 3000...')
});

