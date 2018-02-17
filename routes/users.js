const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Guarderia = require('../models/guarderia');

router.get('/edit', (req, res) => {
  res.render('user/edit', { user: req.user });
});

router.post('/edit', (req, res, next) => {
  const userId = req.user.id;
  const updates = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    children: req.body.children,
  };
  User.findByIdAndUpdate(userId, updates, (err, user) => {
    if (err) { return next(err); }
    return res.redirect('/users/edit');
  });
});

module.exports = router;
