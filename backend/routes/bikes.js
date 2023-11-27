
const express = require('express');
const router = express.Router();

const bikes = require("../models/bikes.js");

//Get all bikes
router.get('/', (req, res) => bikes.getBikes(req, res));



module.exports = router;