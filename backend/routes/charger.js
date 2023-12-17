const express = require("express");
const router = express.Router();

const charger = require("../models/charger.js");

const isAuthenticated = require("../auth-utils.js");

// Middleware för att skydda alla underliggande rutter
router.use(isAuthenticated);

//Get all Chargers
router.get("/", (req, res) => charger.getChargers(req, res));

//Create a charger
router.post("/", (req, res) => charger.createCharger(req, res));

//Get specific charger
router.get("/id/:charger_id", (req, res) => {
    let charger_id = req.params.charger_id;
    charger.getSpecificCharger(req, res, charger_id);
});

//Search for chargers
router.get("/search/:status", (req, res) => {
    let status = req.params.status;
    charger.findChargersByStatus(req, res, status);
});

//Update charger
router.put("/id/:charger_id", (req, res) => {
    let charger_id = req.params.charger_id;
    charger.updateCharger(req, res, charger_id);
});

//Delete Charger
router.delete("/id/:charger_id", (req, res) => {
    let charger_id = req.params.charger_id;
    charger.deleteCharger(req, res, charger_id);
});

module.exports = router;
