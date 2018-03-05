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
  const trueServices = {};
  if (req.body.swimming_pool === 'on') { trueServices.push('services.swimming_pool'); }
  if (req.body.garden === 'on') { trueServices.push('services.swimming_pool'); }
  if (req.body.kitchen === 'on') { trueServices.push('services.swimming_pool'); }
  if (req.body.extra_hours === 'on') { trueServices.push('services.swimming_pool'); }
  if (req.body.spanish === 'on') { trueServices.push('services.swimming_pool'); }
  if (req.body.english === 'on') { trueServices.push('services.swimming_pool'); }
  if (req.body.german === 'on') { trueServices.push('services.swimming_pool'); }
  if (req.body.parking_carrito === 'on') { trueServices.push('services.swimming_pool'); }
  if (req.body.locker === 'on') { trueServices.push('services.swimming_pool'); }

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
