
const express = require('express');
const router = express.Router();

const city = require("../models/city.js");

//Get all cities
router.get('/', (req, res) => city.getCities(req, res));

//Create user
router.post('/', (req, res) => city.createCity(req, res));

//Get specific city
router.get('/id/:city_id', (req, res) => {
    let city_id = req.params.city_id;
    city.getSpecificCity(req, res, city_id)
});

//Update city
router.put('/id/:city_id', (req, res) => {
    let city_id = req.params.city_id;
    city.updateCity(req, res, city_id);
});

//Delete city
router.delete('/id/:city_id', (req, res) => {
    let city_id = req.params.city_id;
    city.deleteCity(req, res, city_id);
});


module.exports = router;