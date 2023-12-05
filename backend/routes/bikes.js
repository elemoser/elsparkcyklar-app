
const express = require('express');
const router = express.Router();

const bikes = require("../models/bikes.js");

//Get all bikes
router.get('/', (req, res) => bikes.getBikes(req, res));

//Get all available bikes
router.get('/available/:city_id', (req, res) => {
    let city_id = req.params.city_id;
    bikes.getAvailableBikes(req, res, city_id)
});

//Get specific bike
router.get('/id/:bike_id', (req, res) => {
    let bike_id = req.params.bike_id;
    bikes.getSpecificBike(req, res, bike_id)
});

//Search for bikes in cities
router.get('/search/:name', (req, res) => {
    let name = req.params.name;
    bikes.getBikesInCity(req, res, name)
});

//Create bike
router.post('/', (req, res) => bikes.createBike(req, res));

//Update bike
router.put('/id/:bike_id', (req, res) => {
    let bike_id = req.params.bike_id;
    bikes.updateBike(req, res, bike_id);
});

//Delete bike
router.delete('/id/:bike_id', (req, res) => {
    let bike_id = req.params.bike_id;
    bikes.deleteBike(req, res, bike_id);
});

module.exports = router;