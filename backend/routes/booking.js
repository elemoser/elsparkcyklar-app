
const express = require('express');
const router = express.Router();

const booking = require("../models/booking.js");

//Get all booking
router.get('/', (req, res) => booking.getBookings(req, res));

//Create booking
router.post('/', (req, res) => booking.createBooking(req, res));


module.exports = router;