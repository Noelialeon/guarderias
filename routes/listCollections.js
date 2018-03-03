
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
  // const { swimmingPool } = req.query;
  const { kitchen } = req.query;
  // const { extraHours } = req.query;
  // const { parkingCarrito } = req.query;
  const { locker } = req.query;
  const { spanish } = req.query;
  const { english } = req.query;
  const { german } = req.query;

  // const allServices = [
  //   { garden }, { swimmingPool }, { kitchen }, { extraHours }, { parkingCarrito }, { locker }, { spanish }, { english }, { german }];
  const allServices = [
    { garden }, { kitchen }, { locker }, { spanish }, { english }, { german }];
  const trueServices = {};

  allServices.forEach((trueService) => {
    if (Object.values(trueService) == 'true') {
      trueServices[Object.keys(trueService)] = true;
      return trueServices;
    }
  });

  console.log('true services', trueServices);

  Guarderias
    .find((error, guarderias) => {
      if (error) {
        res.status(500).json({ message: error });
      } else {
        console.log('at if find', guarderias);
        res.status(200).json(guarderias);
      }
    });
});
