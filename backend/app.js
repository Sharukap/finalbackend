const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var logger = require('morgan');
var path = require('path');

const Students = require('./models/students');
var adminRouter = require('./routes/adminRouter');
var usersRouter = require('./routes/users');

connect.then((db) => {
	console.log('connected to server');
},(err) => {console.log(err);});
var app = express();
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));
app.use('/users', usersRouter);
var auth = (req, res, next) => {
    console.log(req.session);
  if(!req.session.students) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
       next(err);
  }
  else {
    if (req.session.students === 'authenticated') {
      next();
    }
    else {
      var err = new Error('you are not authenticated!');
      err.status = 403;
       next(err);
    }
  }
}
app.use(auth);

app.use('/students', adminRouter);
// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
