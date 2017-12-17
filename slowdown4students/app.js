// set DEBUG=demoapp:* & npm start
// mongod --dbpath C:\MongoDB_data

// To get the environment variables for cloud foundry.
// npm install cfenv
var cfenv = require('cfenv');
var appenv = cfenv.getAppEnv();

// Instantiated Express and assigns the variable app to it.
// require('') is always used to load modules.
//https://github.com/dizlexik/express-reverse
var express = require('express'); // Calls the express module of node.
// Make app global (by not writing 'var') so you can access app.lookupRoute in controllers.
app = express(); // Calls the express function express(),
                    // the returned object - an Express application - is stored in the variable app

// https://lookonmyworks.co.uk/2014/12/30/using-bootstrap-alerts-with-express-js-4/, 27.11.2017
var flash = require('connect-flash');
               
// To send emails.
// npm install nodemailer
// Make global so that you have access in controllers.
nodemailer = require('nodemailer');

// Helper function for Handlbar. So that url do not need to be hardcoded.
// https://www.npmjs.com/package/express-handlebars#helpers
var exphbs  = require('express-handlebars');
var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance. 
  helpers: {
      lookup: function(link) { return app.lookupRoute(link); }
  },
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutDir: __dirname + '/views/layouts/'
});

// https://www.youtube.com/watch?v=1srD3Mdvf50, 18.11.2017
//$npm install handlebars
// Register own exphbs.engine instance.
app.engine('hbs', hbs.engine);
// Creates html language from the view files.
app.set('view engine', 'hbs');
// Frontend: Making partial templates possible.
var hbsPartial = require('hbs');
hbsPartial.registerPartials(__dirname + '/views/partials');

// MongoDB connection.
var mongo = require('./mongodb')(appenv);

var path = require('path'); //Mainly used to join strings.
var bodyParser = require('body-parser') // For parsing the input of the user.
var expressValidator = require('express-validator'); // For form validation.

// For parsing the input of the user.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // Add this after the bodyParser middlewares!

// Makes rendering of views files possible, defines hbs standard.
app.set('views', path.join(__dirname, 'views'));
// Makes linking between views and stylesheets possible.
app.use(express.static(path.join(__dirname, 'public')));

// For sessions, login and logout.
// npm install express-session
// npm install connect-mongo (for persistent storage)
var mongoose = require('mongoose');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({ 
  secret: 'example', 
  cookie: { maxAge: 2 * 60 * 60 * 1000 },
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  resave: true, 
  saveUninitialized: true 
}));

// Is needed to create flash messages and redirect (instead of render)
// flash() requires session, so it needs to be called after session.
// npm install connect-flash
app.use(flash());
app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.errors = req.flash('error');
    next();
});

// CheckAuth is  called before every request.
// Needs to be written before the routes are called.
function checkAuth (req, res, next) {
	console.log('checkAuth ' + req.url);

	// don't serve /secure to those not logged in
	// you should add to this list, for each and every secure url
	if (req.url === '/calendar' && (!req.session || !req.session.authenticated)) {
		res.render('unauthorised', { status: 403 });
		return;
	}

	next();
}
app.use(checkAuth);


var index = require('./routes/index_routes'); // index catchs document index_routes.
var movies = require('./routes/movie_routes'); // movies catch document movie_routes.
var users = require('./routes/user_routes');

// To define route names (app.defineRoute, see below), so that they do not need to be hardcoded.
// npm install express-named-routes
var namedRoutes = require('express-named-routes');
namedRoutes.extend(app);

// Frontend define routes so that they do not need to be hardcoded.
// https://www.npmjs.com/package/express-named-routes, 19.11.2017
app.defineRoute('homepage', '/');
app.defineRoute('calendar', '/calendar');
app.defineRoute('about', '/about');
app.defineRoute('login', '/login');
app.defineRoute('logout', '/logout');
app.defineRoute('movies', '/movies/');
app.defineRoute('addMovie', '/movies/add');
app.defineRoute('signUp', '/users/add');
app.defineRoute('registration', '/users/register')

// Routing.
app.use('/', index);
app.use('/movies', movies);
app.use('/users', users);

// Enables to connect localhost on port 3000 to the application.
app.listen(process.env.VCAP_APP_PORT || 3000, function(){
  console.log('Server started on port 3000...')
});

// Makes API call when the sec is 01, e.g. on 13:00:01, 13:01:01, 13:02:01 etc. and stores result in popularMovies.
// npm install node-schedule
var schedule = require('node-schedule');
popularMovies = {};
j = schedule.scheduleJob('1 * * * * *', function(){
  console.log('API request for most popular movies!');
  var request = require('request');
  request('https://api.themoviedb.org/3/movie/popular?api_key=6d5fbbe716371a300e974cd7e7d8db49&language=en-UK&page=1&region=Switzerland&sort_by=popularity.desc?', function (error, response, body) {
   console.log('error:', error); // Print the error if one occurred and handle it
   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
   //res.send(body)
   var jsondata = JSON.parse(body);
   var img1 = "https://image.tmdb.org/t/p/w92"+jsondata.results[0].poster_path;
   var img2 = "https://image.tmdb.org/t/p/w92"+jsondata.results[1].poster_path;
   var img3 = "https://image.tmdb.org/t/p/w92"+jsondata.results[3].poster_path;
   popularMovies = {
     first : {
      title: jsondata.results[0].title,
      img: img1
     },
     second : {
      title: jsondata.results[1].title,
      img: img2
     },
     third : {
      title: jsondata.results[2].title,
      img: img3
     }
   };
   });
 });
 