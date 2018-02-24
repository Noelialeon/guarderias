/* eslint-disable */

const express = require('express');
const router = express.Router();
const moment = require('moment');
const User = require('../models/user');
const Guarderia = require('../models/guarderia');
const Opinion = require('../models/opinion');

const authMiddleware = require('../middlewares/auth');
const allOpinions = [];

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

router.get('/private-profile/:username', (req, res, next) => {
  console.log("at private profile", req);
  if (req.params.username === req.user.username) {
    Guarderia
      .findOne({ username: req.params.username })
      .exec((err, user) => {
        if (!user) {
          next(err);
        }
        Opinion.find({ guarderia_username: user.username }, 'opinion comment user_name star_ranking created_at')
          .sort({ created_at: -1 })
          .exec((err, opinions) => {
            console.log("guarderia is", user, "opinions are", opinions, "moment is", moment);
            res.render('guarderia/private-profile', { guarderia: user, opinions, moment, err });
          });
      });
  } else {
    res.redirect('/login');
  }
});

router.get('/profile/:username', (req, res, next) => {
  Guarderia
    .findOne({ username: req.params.username })
    .exec((err, user) => {
      if (!user) {
        next(err);
      }
      Opinion.find({ guarderia_id: user._id }, 'opinion comment user_name star_ranking created_at')
        .sort({ created_at: -1 })
        .exec((err, opinions) => {
          res.render('guarderia/profile', { guarderia: user, opinions, moment, err });
        });
    });
});

router.post('/profile/:username', (req, res, next) => {
  Guarderia
    .findOne({ username: req.params.username })
    .exec((err, currentGuarderia) => {
      if (!currentGuarderia) {
        next(err);
      }
      const currentUser = req.user;
      const newOpinion = {
        comment: req.body.commentBody,
        user_id: currentUser._id,
        user_name: currentUser.username,
        guarderia_id: currentGuarderia._id,
        star_ranking: req.body.starsRanking,
      };
      Opinion.create(newOpinion)
        .then((opinion) => {
          res.redirect(req.params.username);
        })
        .catch((err) => { next(err); });
    });
  });

  module.exports = router;
