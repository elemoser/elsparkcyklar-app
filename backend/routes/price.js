
const express = require('express');
const router = express.Router();

const price = require("../models/price.js");

//Get all price types
router.get('/', (req, res) => price.getPrices(req, res));

//Create new price type
router.post('/', (req, res) => price.createPriceType(req, res));

//Get specific price type
router.get('/id/:price_id', (req, res) => {
    let price_id = req.params.price_id;
    price.getPriceType(req, res, price_id)
});

//Update price
router.put('/id/:price_id', (req, res) => {
    let price_id = req.params.price_id;
    price.updatePriceType(req, res, price_id);
});

//Delete price
router.delete('/id/:price_id', (req, res) => {
    let price_id = req.params.price_id;
    price.deletePriceType(req, res, price_id);
});



module.exports = router;
