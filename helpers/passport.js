const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

function configurePassport() {
  passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });

  passport.deserializeUser((id, cb) => {
    User.findOne({ '_id': id }, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  const myLocalStrategy1 = new LocalStrategy({
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

  passport.use('local.one', myLocalStrategy1);
}

module.exports = configurePassport;
