const express = require("express");
const router = express.Router();

const price = require("../models/price.js");

const isAuthenticated = require("../auth-utils.js");

// Middleware för att skydda alla underliggande rutter
router.use(isAuthenticated);

//Get prices
router.get("/", (req, res) => price.getPriceType(req, res));

//Update price
router.put("/", (req, res) => price.updatePriceType(req, res));

module.exports = router;
