var express = require('express');
var router = express.Router();

// require controller modules
var movieController = require('../controllers/movieController');

// GET request for /movies/, routing to movie_controller
router.get('/', movieController.index);

// GET request /movies/create, routing to movie_controller
router.get('/movie/create', movieController.movie_create_get);

// guarantees access to the method of this file for other files, e.g. for app.js
module.exports = router;