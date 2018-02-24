const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const bcrypt = require('bcrypt');
const passport = require('passport');
const configurePassport = require('./helpers/passport');
const flash = require('connect-flash');

const multer = require('multer');

const { url, db, port } = require('./config');

mongoose.connect(`mongodb://${url}:${port}/${db}`, { useMongoClient: true });
mongoose.Promise = global.Promise;

const home = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const guarderias = require('./routes/guarderias');
const listCollections = require('./routes/listCollections');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout extractScripts', true); // see Documentation
app.set('layout extractStyles', true); // see Documentation
app.set('layout extractMetas', true); // see Documentation
app.set('layout', 'layouts/main');
app.set('layout extractScripts', true);
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(expressLayouts);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'our-passport-local-strategy-app',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60, // 1 day
  }),
}));

configurePassport();
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = req.user;
    res.locals.role = req.session.passport.user.role;
  } else {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.currentUser = null;
    res.locals.role = null;
  }
  next();
});

app.use('/', home);
app.use('/', auth);
app.use('/users', users);
app.use('/guarderias', guarderias);
app.use('/chargeGuarderiasDB', listCollections);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
