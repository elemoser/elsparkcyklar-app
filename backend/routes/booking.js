const express = require("express");
const router = express.Router();

const booking = require("../models/booking.js");

//Get all bookings (including finished trips)
router.get("/", (req, res) => booking.getAllBookings(req, res));

//Get all LIVE bookings (ongoing trips)
router.get("/ongoing", (req, res) => booking.getOngoing(req, res));

//Create new booking
router.post("/", (req, res) => booking.createBooking(req, res));

//update booking - avslutar en resa
router.put("/id/:booking_id", (req, res) => {
    let booking_id = req.params.booking_id;
    booking.endTrip(req, res, booking_id);
});

module.exports = router;
