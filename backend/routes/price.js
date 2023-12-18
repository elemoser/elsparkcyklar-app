const express = require("express");
const router = express.Router();

const price = require("../models/price.js");

//Get prices
router.get("/", (req, res) => price.getPriceType(req, res));

//Update price
router.put("/", (req, res) => price.updatePriceType(req, res));

module.exports = router;
