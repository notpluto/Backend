var createError = require('http-errors');
var flash = require('express-flash');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
const MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose'); 
var modules = require('./modules/database')


// Connecting mongoose to DB
mongoose.connect(modules.database,  (err) => {
	console.log(err) ? console.log('Unable to connect to DB') : console.log('Connected to mongodb')
});

// require('./modules/passport-local');
require('./modules/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Flash middleware
app.use((req, res, next) => {
  var error = req.flash('error');
  console.log(error);
  res.locals.error = error;
  next()
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
