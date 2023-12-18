const express = require("express");
const router = express.Router();

const invoice = require("../models/invoice.js");

const isAuthenticated = require("../auth-utils.js");

// Middleware för att skydda alla underliggande rutter
router.use(isAuthenticated);

//Get all bookings (including finished trips)
router.get("/", (req, res) => invoice.getInvoices(req, res));

//Get specific invoice via user_id
router.get("/id/:invoice_id", (req, res) => {
    let invoice_id = req.params.invoice_id;
    invoice.getSpecificInvoice(req, res, invoice_id);
});

//Update invoice for specific_user
router.put("/id/:invoice_id", (req, res) => {
    let invoice_id = req.params.invoice_id;
    invoice.updateInvoice(req, res, invoice_id);
});

//Delete invoice
router.delete("/id/:invoice_id", (req, res) => {
    let invoice_id = req.params.invoice_id;
    invoice.deleteInvoice(req, res, invoice_id);
});

module.exports = router;
