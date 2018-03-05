
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

router.get('/search', (req, res) => {
  // requerimos todas la querys y las almacenamos como objetos tipo { garden: true }
  const { garden,
    swimmingPool,
    kitchen,
    extraHours,
    parkingCarrito,
    locker,
    spanish,
    english,
    german } = req.query;

  const allServices = [
    { garden }, { swimmingPool }, { kitchen }, { extraHours }, { parkingCarrito }, { locker }, { spanish }, { english }, { german }];

  const trueServices = {};

  allServices.forEach((trueService) => {
    if (Object.values(trueService) === 'true') {
      trueServices[Object.keys(trueService)] = true;
      return trueServices;
    }
  });
  Guarderias
    .find(trueServices, (error, guarderias) => {
      if (error) {
        res.status(500).json({ message: error });
      } else {
        res.status(200).json(guarderias);
      }
    });
});

router.get('/searchfilter', (req, res, next) => {
  const query = {};
  if (Object.keys(req.query).length !== 0) {
    Object.entries(req.query).forEach(([key, value]) => {
      if (value === 'on') {
        query[`services.${key}`] = true;
      }
    });
  }
  Guarderias
    .find(query, (error, guarderias) => {
      if (error) {
        res.status(500).json({ message: error });
      } else {
        res.status(200).json(guarderias);
      }
    });
});

module.exports = router;
