var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) { // get / stands for /users/
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) { // get / stands for /users/
  res.render('register');
});

router.get('/login', function(req, res, next) { // get / stands for /users/
  res.send('respond with a resource');
});

module.exports = router;
