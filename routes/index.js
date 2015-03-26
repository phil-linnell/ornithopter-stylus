var express = require('express');
var router = express.Router();

// HOME
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// About
router.get('/about', function(req, res) {
  res.render('about', { title: 'Express' });
});

module.exports = router;
