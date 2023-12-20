
const express = require('express');
const router = express.Router();

const simulate = require("../models/simulate.js");

//Start simulation
router.get('/:number_of_trips', (req, res) => {
    const simTrips = req.params.number_of_trips
    simulate.startSimulation(req, res, simTrips)
    });
router.get('/', (req, res) => {
    simulate.startSimulation(req, res)
    });


module.exports = router;