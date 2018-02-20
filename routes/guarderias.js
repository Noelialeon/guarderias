const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Guarderia = require('../models/guarderia');

router.get('/edit', (req, res) => {
  res.render('guarderia/edit', { user: req.user });
});

router.post('/edit', (req, res, next) => {
  const guarderiaId = req.user.id;
  const updates = {
    name: req.body.name,
    description: req.body.description,
    address: {
      street: req.body.street,
      number: req.body.streetnumber,
      postcode: req.body.postcode,
      city: req.body.city,
      coordinates: [req.body.longitude, req.body.latitude],
    },
    facilities: {
      garden: req.body.garden,
      swimming_pool: req.body.swimming_pool,
    },
    telephone: req.body.telephone,
    email: req.body.email,
  };
  Guarderia.findByIdAndUpdate(guarderiaId, updates, (err, user) => {
    if (err) { return next(err); }
    return res.redirect('/guarderias/edit');
  });
});

router.get('/profile/:_id', (req, res, next) => {
  Guarderia
    .findOne({ _id: req.params._id })
    .exec((err, user) => {
      if (!user) {
        next(err);
      }
      res.render('guarderia/profile', { guarderia: user });
    });
});


module.exports = router;
