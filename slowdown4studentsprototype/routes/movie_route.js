
var Express = require('express');
var Router = Express.Router();

var MovieController = require('../controllers/movie_controller');

// Retrieve movie
Router.get('/', MovieController.get);

// Add movie
Router.post('/add', MovieController.save);


module.exports = Router;