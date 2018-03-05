
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

  // Array de todos los objetos anteriores
  const allServices = [
    { garden }, { swimmingPool }, { kitchen }, { extraHours }, { parkingCarrito }, { locker }, { spanish }, { english }, { german }];

  //   // objeto donde se almacenarán únicamente los key que tengan valor true
  const trueServices = {};

  // función para almacenar únicamente los key que tengan valor true
  allServices.forEach((trueService) => {
    if (Object.values(trueService) == 'true') {
      trueServices[Object.keys(trueService)] = true;
      return trueServices;
    }
  });

  // en la terminal veremos qué valores nos han dado true y se mostrarán como un objeto.
  console.log('true services', trueServices);

  // buscamos en el modelo Guarderías cuáles tienen el valor true de los distintos keys que le pasamos mediante trueServices (tipo garden, swimmingpool.etc)
  // problema: se busca como { garden: true, swimminpool: true } y debería ser { services.garden: true, services.swimminpool: true }. No he conseguido añadir ese services.
  Guarderias
    .find(trueServices, (error, guarderias) => {
      if (error) {
        res.status(500).json({ message: error });
      } else {
        // al hacer este console.log, debería dar el resultado de qué guarderías tienen en valor true los key anteriores, pero sale vacío
        console.log('at if find', guarderias);
        res.status(200).json(guarderias);
      }
    });
});

router.get('/searchthor', (req, res, next) => {
  const query = {};
  if (Object.keys(req.query).length != 0) {
    console.log('tengo query');
    Object.entries(req.query).forEach(([key, value]) => {
      if (value === 'on') {
        query[`services.${key}`] = true;
      }
    })
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
