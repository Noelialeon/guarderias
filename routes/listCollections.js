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
