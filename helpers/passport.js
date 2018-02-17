const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const Guarderia = require('../models/guarderia');

function configurePassport() {
  passport.serializeUser((user, cb) => {
    /*eslint-disable */
    cb(null, { id: user._id, role: user.collection.collectionName} );
  });

  passport.deserializeUser((user, cb) => {
    if (user.role === 'guarderias') {      
    Guarderia.findOne({ '_id': user.id }, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  } else if (user.role === 'users') {
    User.findOne({ '_id': user.id }, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  }});

  const myLocalStrategy = new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: 'Incorrect username' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: 'Incorrect password' });
      }

      return next(null, user);
    });
  });
  passport.use('local', myLocalStrategy);


  const myLocalStrategy2 = new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, next) => {
    Guarderia.findOne({ username }, (err, user) => {
      console.log('localstrategy2: ', user);
      if (err) {
        
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: 'Incorrect username' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: 'Incorrect password' });
      }

      return next(null, user);
    });
  });
  passport.use('local2', myLocalStrategy2);
}

module.exports = configurePassport;
