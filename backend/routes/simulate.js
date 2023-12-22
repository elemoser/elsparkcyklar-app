const express = require("express");
const router = express.Router();

const simulate = require("../models/simulate.js");

//Start simulation
router.get("/", (req, res) => simulate.startSimulation(req, res));

module.exports = router;
