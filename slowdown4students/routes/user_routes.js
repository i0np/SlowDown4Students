var express = require('express');
var router = express.Router();

// Require controller modules
var userController = require('../controllers/user_controller');

router.post('/add', userController.save);
router.post('/register', userController.register);

// Guarantees access to the method of this file for other files, e.g. for app.js.
module.exports = router;
