
const express = require('express');
const router = express.Router();

const parking = require("../models/parking.js");

//Get all Parkings
router.get('/', (req, res) => parking.getParkings(req, res));

//Create parking
router.post('/', (req, res) => parking.createParking(req, res));

//Get specific parking
router.get('/id/:parking_id', (req, res) => {
    let parking_id = req.params.parking_id;
    parking.getSpecificParking(req, res, parking_id)
});

module.exports = router;