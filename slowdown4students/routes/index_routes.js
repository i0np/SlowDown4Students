var express = require('express');
var router = express.Router();
var indexController = require('../controllers/index_controller');

router.get('/', indexController.home);

router.post('/login', indexController.login);
router.get('/logout', indexController.logout);

router.get('/calendar', indexController.calendar);
router.get('/about', indexController.about);

// guarantees access to the method of this file for other files, e.g. for app.js
module.exports = router; 
