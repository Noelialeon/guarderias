/* eslint-disable */

const express = require('express');
const router = express.Router();
const moment = require('moment');
const User = require('../models/user');
const Guarderia = require('../models/guarderia');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const Opinion = require('../models/opinion');

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

router.get('/profile/:_id', (req, res, next) => {
  Guarderia
    .findOne({ _id: req.params._id })
    .exec((err, user) => {
      if (!user) {
        next(err);
      }
      Opinion.find({ guarderia_id: user._id }, 'opinion comment user_name star_ranking created_at')
        .sort({ created_at: -1 })
        .exec((err, opinions) => {
          console.log("guarderia is", user, "opinions are", opinions, "moment is", moment);
          res.render('guarderia/profile', { guarderia: user, opinions, moment, err });

        });
    });
});

router.post('/profile/:_id', (req, res, next) => {
  const currentUser = req.user;
  const guarderiaProfile = req.params;
  const newOpinion = {
    comment: req.body.commentBody,
    user_id: currentUser._id,
    user_name: currentUser.username,
    guarderia_id: guarderiaProfile._id,
    star_ranking: req.body.starsRanking,
  };
  Opinion.create(newOpinion)
    .then((opinion) => {
      Guarderia
      res.redirect(req.params._id);
      })
    .catch((err) => { next(err); });
});

router.post('/upload', upload.single('photo'), (req, res, next) => {
  const guarderiaId = req.user.id;
  Guarderia.findByIdAndUpdate(guarderiaId, {
    profilepic_path: `/uploads/${req.file.filename}`,
    profilepic_name: req.file.originalname,
  }, (err, user) => {
    if (err) { return next(err); }
    return res.redirect('/guarderias/edit');
  });
});



module.exports = router;
