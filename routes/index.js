const express = require('express');
const router = express.Router();

const User = require('../models/user');

const authMiddleware = require('../middlewares/auth');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/profile', authMiddleware('/login'), (req, res, next) => {
  res.render('profile');
});

module.exports = router;
