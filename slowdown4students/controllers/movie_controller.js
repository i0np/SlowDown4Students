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
    res.render('add_Movie', {title:'Add Movie', authenticated: aut});
}; 

exports.save = function(req, res) {
    var movie = new movieModel();
    movie.name = req.body.name;
    movie.category = req.body.category;
    movie.place = req.body.place;

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
};