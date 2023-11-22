
const express = require('express');
const router = express.Router();

const city = require("../models/city.js");

router.get('/', (req, res) => city.getCity(req, res));

module.exports = router;