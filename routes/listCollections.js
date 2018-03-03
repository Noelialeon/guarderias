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
  const { kitchen } = req.query;
  const { extraHours } = req.query;
  const { parkingCarrito } = req.query;
  const { locker } = req.query;
  const { spanish } = req.query;
  const { english } = req.query;
  const { german } = req.query;

  Guarderias
    .where('services.garden', garden)
    .where('services.swimming_pool', swimmingPool)
    .where('services.kitchen', kitchen)
    .where('services.extra_hours', extraHours)
    .where('services.spanish', spanish)
    .where('services.english', english)
    .where('services.german', german)
    .where('services.parking_carrito', parkingCarrito)
    .where('services.locker', locker)
    .find((error, guarderias) => {
      if (error) {
        res.status(500).json({ message: error });
      } else {
        res.status(200).json(guarderias);
      }
    });
});
