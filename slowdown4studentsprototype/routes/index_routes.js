var express = require('express');
var router = express.Router();

// renders the home view
router.get('/', function(req, res, next) {
  res.render('home');
});

// guarantees access to the method of this file for other files, e.g. for app.js
module.exports = router;
