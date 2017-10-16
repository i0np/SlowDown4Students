var express = require('express');
var router = express.Router();

// Require controller modules
var movie_controller = require('../controllers/movieController');


/* GET movie home page. */
router.get('/', movie_controller.index);

/* GET request for creating a Book. */
router.get('/movie/create', movie_controller.movie_create_get);

module.exports = router;