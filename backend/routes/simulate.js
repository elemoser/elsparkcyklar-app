
const express = require('express');
const router = express.Router();

const simulate = require("../models/simulate.js");

//Start simulation
router.get('/:number_of_trips/:sim_speed', (req, res) => {
    const simTrips = req.params.number_of_trips
    const simSpeed = req.params.sim_speed
    simulate.startSimulation(req, res, simTrips, simSpeed)
    });
router.get('/', (req, res) => {
    simulate.startSimulation(req, res)
    });


module.exports = router;