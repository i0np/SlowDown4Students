var Movie = require('../models/movie');

exports.index = function(req, res) {
    res.send('This shows all movie activities.');
};

exports.movie_create_get = function(req, res) {
    res.send('Here you can create a new movie activity.');
};