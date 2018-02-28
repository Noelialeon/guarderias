const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Guarderia = require('../models/guarderia');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const authMiddlewareToPublic = require('../middlewares/auth-toPublic');
const authMiddlewareToPrivate = require('../middlewares/auth-toPrivate');


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

router.post('/upload', upload.single('photo'), (req, res, next) => {
  const userId = req.user.id;
  User.findByIdAndUpdate(userId, {
    profilepic_path: `/uploads/${req.file.filename}`,
    profilepic_name: req.file.originalname,
  }, (err, user) => {
    if (err) { return next(err); }
    return res.redirect('/users/edit');
  });
});

router.get('/profile/:username', authMiddlewareToPrivate('/users/private-profile/'), (req, res, next) => {
  User
    .findOne({ username: req.params.username })
    .exec((err, user) => {
      if (!user) {
        next(err);
      }
      res.render('user/profile', { user });
    });
});

router.get('/private-profile/:username', authMiddlewareToPublic('/users/profile/'), (req, res, next) => {
  User
    .findOne({ username: req.params.username })
    .exec((err, user) => {
      if (!user) {
        next(err);
      }
      res.render('user/private-profile', { user });
    });
});

module.exports = router;
