var movieModel = require('../models/movie_model');

exports.get = function(req, res) {
    movieModel.find({}, function(err, movie) {
        if (err) {
            console.log('Cant retrieve movie. Please try again');
        }
        else {
            console.log('Data: ' + movie);
            var aut = req.session.authenticated;
            res.render('movie', {movies: movie, object: popularMovies, authenticated: aut});
        }

    });
};

exports.create = function(req, res) {
    var aut = req.session.authenticated;
    res.render('create_movie', {title:'Add Movie', authenticated: aut});
}; 

exports.save = function(req, res) {
    var movie = new movieModel();
    movie.name = req.body.name;
    movie.category = req.body.category;
    movie.place = req.body.place;
    movie.date = req.body.date;

    //check if the same movie is already present in DB
    movieModel.findOne({name:req.body.name}, 'name', function(err, movieCheck) {
      if(!err) {
        if (movieCheck == null) {
            console.log('Movie is not present in DB. Go ahead to insert: ');
            movie.save(function(err) {
                if (err) {
                    console.log('Movie not inserted in DB');
                    throw err;
                }
                else {
                    console.log('Movie inserted in DB successfully');
                    res.redirect(app.lookupRoute('homepage'))
                }
              }); 
        } else {
            console.log('Movie is already exists in DB');
            res.render('home', {authenticated: false, type: 'alert alert-danger alert-dismissable', info: 'Error!', messages: 'Movie already exists in DB.'});
        }
      } else {
        console.log('Error while trying to check if Movie is already exists in DB');
        throw err;
    } 
    
    });
};