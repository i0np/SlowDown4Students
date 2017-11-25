var express = require('express');
var router = express.Router();

// Require controller modules
var movieController = require('../controllers/movie_controller');

// GET request for /movies/, routing to movie_controller.
// Listing all available movie activities.
router.get('/', movieController.get);

// GET and POST request /movies/add, routing to movie_controller.
// Enables users to add new movie .
router.get('/add', movieController.create);
router.post('/add', movieController.save);

// Guarantees access to the method of this file for other files, e.g. for app.js.
module.exports = router;
