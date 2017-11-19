
var express = require('express');
var router = express.Router();

var movieController = require('../controllers/movie.controller');

// Retrieve movie
router.get('/', movieController.get);

// Add movie
router.post('/add', movieController.save);


module.exports = router;