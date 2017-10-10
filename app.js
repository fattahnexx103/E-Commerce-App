var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var upload = multer({dest: './uploads'});
var flash = require('connect-flash');
var mongodb = require('mongodb');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');

var db = mongoose.connection;

//import routes
var routes = require('./routes/index');
var users = require('./routes/users')

var express = require('express')
  , validate = require('express-validation')
  , http = require('http')
  , bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index); //this goes to index.js
app.use('/users', users); //this goes to /users

//handle sessions
app.use(session({
  secret:'secret',
  saveUninitialized: true,
  resave: true
}));

//express validation
app.use(function(err, req, res, next){
  res.status(400).json(err);
});

//express messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
