

const express = require('express');
const router = express.Router();
const moment = require('moment');
const User = require('../models/user');
const Guarderia = require('../models/guarderia');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const Opinion = require('../models/opinion');
const authMiddlewareToPublic = require('../middlewares/auth-toPublic');
const authMiddlewareToPrivate = require('../middlewares/auth-toPrivate');

const allOpinions = [];

router.get('/edit', (req, res) => {
  res.render('guarderia/edit', { user: req.user });
});

router.post('/edit', (req, res, next) => {
  const guarderiaId = req.user.id;
  let swimmingPoolIs;
  let squaremetersIs;
  let kitchenIs;
  let extraHoursIs;
  let spanishIs;
  let gardenIs;
  let englishIs;
  let germanIs;
  let parkingCarritoIs;
  let lockerIs;
  if (req.body.swimming_pool === 'on') { swimmingPoolIs = 'true'; } else { swimmingPoolIs = 'false'; }
  if (req.body.garden === 'on') { gardenIs = 'true'; } else { gardenIs = 'false'; }
  if (req.body.kitchen === 'on') { kitchenIs = 'true'; } else { kitchenIs = 'false'; }
  if (req.body.extra_hours === 'on') { extraHoursIs = 'true'; } else { extraHoursIs = 'false'; }
  if (req.body.spanish === 'on') { spanishIs = 'true'; } else { spanishIs = 'false'; }
  if (req.body.english === 'on') { englishIs = 'true'; } else { englishIs = 'false'; }
  if (req.body.german === 'on') { germanIs = 'true'; } else { germanIs = 'false'; }
  if (req.body.parking_carrito === 'on') { parkingCarritoIs = 'true'; } else { parkingCarritoIs = 'false'; }
  if (req.body.locker === 'on') { lockerIs = 'true'; } else { lockerIs = 'false'; }
  const updates = {
    name: req.body.name,
    description: req.body.description,
    website: req.body.website,
    address: {
      street: req.body.street,
      number: req.body.streetnumber,
      postcode: req.body.postcode,
      city: req.body.city,
      coordinates: [req.body.longitude, req.body.latitude],
    },
    services: {
      garden: gardenIs,
      swimming_pool: swimmingPoolIs,
      kitchen: kitchenIs,
      extra_hours: extraHoursIs,
      spanish: spanishIs,
      english: englishIs,
      german: germanIs,
      parking_carrito: parkingCarritoIs,
      locker: lockerIs,
    },
    telephone: req.body.telephone,
    email: req.body.email,
  };
  Guarderia.findByIdAndUpdate(guarderiaId, updates, (err, user) => {
    if (err) { return next(err); }
    return res.redirect('/guarderias/edit');
  });
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


router.get('/private-profile/:username', authMiddlewareToPublic('/guarderias/profile/'), (req, res, next) => {
  Guarderia
    .findOne({ username: req.params.username })
    .exec((err, user) => {
      console.log(user);
      if (!user) {
        next(err);
      }
      Opinion.find({ guarderia_id: user._id }, 'opinion comment user_name star_ranking created_at')
        .sort({ created_at: -1 })
        .exec((err, opinions) => {
          res.render('guarderia/private-profile', { guarderia: user, opinions, moment, err });
        });
    });
});

router.get('/profile/:username', authMiddlewareToPrivate('/guarderias/private-profile/'), (req, res, next) => {
  Guarderia
    .findOne({ username: req.params.username })
    .exec((err, user) => {
      if (!user) {
        next(err);
      }
      Opinion.find({ guarderia_id: user._id }, 'opinion comment user_name user_realName star_ranking created_at')
        .sort({ created_at: -1 })
        .exec((err, opinions) => {
          res.render('guarderia/profile', { guarderia: user, opinions, moment, err, });
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
      const userName = currentUser.username;
      const userRealName = `${currentUser.firstname} ${currentUser.lastname}`;
      const newOpinion = {
        comment: req.body.commentBody,
        user_id: currentUser._id,
        user_name: userName,
        user_realName: userRealName,
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

router.post('/uploadpictures', upload.single('photo'), (req, res, next) => {
  const guarderiaId = req.user.id;
  Guarderia.findById(guarderiaId, (err, guarderia) => {
    const path = `/uploads/${req.file.filename}`;
    guarderia.otherpics.push(path);
    guarderia.save((err) => {
      if (err) {
        console.error(err)
      } else {
        res.redirect('/guarderias/edit');
      }
    });
  });
})

router.get('/deletepicture/:index', (req, res, next) => {
  guarderiaId = req.user.id;
  Guarderia.findById(guarderiaId, (err, guarderia) => {
    guarderia.otherpics.splice(req.params, 1);
    guarderia.save((err) => {
      if (err) {
        console.error(err)
      } else {
        res.redirect('/guarderias/edit');
      }
    });
  });
})


module.exports = router;
