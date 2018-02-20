const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Guarderias = require('../models/guarderia');

const authMiddleware = require('../middlewares/auth');

/* GET home page. */
router.get('/', (req, res) => {
  Guarderias.find((error, guarderias) => {
    if (error) {
      res.status(500);
      res.json({ message: error });
    } else {
      res.status(200);
      res.json(guarderias);
    }
  });
});
module.exports = router;

// terminar search para que coja la url - Thor
router.get('/search', (req, res) => {
  const { garden } = req.query;
  const { swimmingPool } = req.query;
  Guarderias.where('facilities.garden', garden).where('facilities.swimming_pool', swimmingPool)
    .find((error, guarderias) => {
      if (error) {
        res.status(500).json({ message: error });
      } else {
        res.status(200).json(guarderias);
      }
    });
});
