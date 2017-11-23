
var MovieModel = require('../models/movie_model');

exports.get = function(req, res) {
    MovieModel.find({}, function(err, movie) {
        if (err) {
            console.log('Cant retrieve movie. Please try again');
        }
        else {
            console.log('Data: ' + movie);
            res.render('movie', {movies: movie});
        }

    });
};


exports.save = function(req, res) {
    var Movie = new MovieModel();
    Movie.name = req.body.name;
    Movie.category = req.body.category;
    Movie.place = req.body.place;

    Movie.save(function(err) {
        if (err) {
            console.log('Movie not inserted in DB');
            throw err;
        }
        else {
            console.log('Movie inserted in DB successfully');
            res.redirect('/')
        }
      
      });
};