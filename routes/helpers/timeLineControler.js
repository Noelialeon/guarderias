const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Models
const Opinion = require('../../models/opinion');

// Moment to format dates
const moment = require('moment');

router.get('/', (req, res, next) => {
  Opinion
    .find({}, 'user_name opinion created_at')
    .sort({ created_at: -1 })
    .exec((err, timeline) => {
      res.render('timeline', { timeline, moment });
    });
});

module.exports = router;
