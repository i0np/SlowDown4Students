// access to the movie model in case of operations
var Movie = require('../models/movieModel');

// exports makes index method accessible for other files, e.g. movies.js in the route folder
exports.index = function(req, res) {
    res.send('This shows all movie activities.');
};

exports.movie_create_get = function(req, res) {
    res.send('Here you can create a new movie activity.');
};