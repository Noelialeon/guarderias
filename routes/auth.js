const express = require('express');
const router = express.Router();
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const isLoggedIn = require('../middlewares/auth');

const User = require('../models/user');
const Guarderia = require('../models/guarderia');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get('/signup', (req, res, next) => {
  res.render('auth/signup');
});

router.post('/user/signup', (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;
  if (username === '' || password === '') {
    res.render('auth/signup', { message: 'Indicate username and password' });
    return;
  }
  User.findOne({ username }, 'username', (err, user) => {
    if (user !== null) {
      res.render('auth/signup', { message: 'The username already exists' });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      password: hashPass,
    });
    newUser.save((err) => {
      if (err) {
        res.render('auth/signup', { message: 'Something went wrong' });
      } else {
        res.redirect('/');
      }
    });
  });
});

router.post('/guarderia/signup', (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;
  if (username === '' || password === '') {
    res.render('auth/signup', { message: 'Indicate username and password' });
    return;
  }
  Guarderia.findOne({ username }, 'username', (err, guarderia) => {
    if (guarderia !== null) {
      res.render('auth/signup', { message: 'The guarderia already exists' });
      return;
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const newGuarderia = new Guarderia({
      username,
      password: hashPass,
    });
    newGuarderia.save((err) => {
      if (err) {
        res.render('auth/signup', { message: 'Something went wrong' });
      } else {
        res.redirect('/');
      }
    });
  });
});

router.get('/login', (req, res, next) => {
  res.render('auth/login', { message: req.flash('error') });
});

router.post('/user/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true,
}));

router.post('/guarderia/login', passport.authenticate('local2', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true,
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
