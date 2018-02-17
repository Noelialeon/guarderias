const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FbStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const Guarderia = require('../models/guarderia');

function configurePassport() {
  passport.serializeUser((user, cb) => {
    /*eslint-disable */
    cb(null, { id: user._id, role: user.collection.collectionName} );
    /*eslint-disable */
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


passport.use(new FbStrategy({
  clientID: '443951352690510',
  clientSecret: '2745628e88cfd1b32490ab7ea80afa00',
  callbackURL: '/auth/facebook/callback',
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ facebookID: profile.id }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      facebookID: profile.id,
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      done(null, newUser);
    });
  });
}));

module.exports = configurePassport;
