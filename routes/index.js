const express = require('express');
const router = express.Router();

const User = require('../models/user');

const authMiddleware = require('../middlewares/auth');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('home', { title: 'Express' });
});

router.post('/guarderias-search', (req, res, next) => {
  const { address } = req.body;
  res.render('guarderias-search', { address });
});

module.exports = router;
