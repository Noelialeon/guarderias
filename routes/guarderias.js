const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Guarderia = require('../models/guarderia');
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

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
    },
    telephone: req.body.telephone,
    email: req.body.email,
  };

  Guarderia.findByIdAndUpdate(guarderiaId, updates, (err, user) => {
    if (err) { return next(err); }
    return res.redirect('/guarderias/edit');
  });
});

router.get('/edit', (req, res) => {
  res.render('guarderia/edit', { user: req.user });
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
