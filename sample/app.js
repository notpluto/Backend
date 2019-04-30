var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
const MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var Blog = require('./models/Blog')
var Book = require('./models/Book')
var authController = require('./controllers/authController')

// Connecting mongoose to DB
mongoose.connect('mongodb://localhost/sample',  (err) => {
	console.log(err) ? console.log('Unable to connect to DB') : console.log('Connected to mongodb')
});

require('./modules/passport')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var authorRouter = require('./routes/author');
var authRouter = require('./routes/auth');

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
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')));

app.use(authController.sessions);
app.use(passport.initialize())
// app.use(passport.session())


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/author', authorRouter);
app.use('/auth', authRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.locals.success_messages = req.flash('success_messages');
  // res.locals.error_messages = req.flash('error_messages');

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
