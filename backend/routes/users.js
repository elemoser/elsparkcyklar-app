const express = require("express");
const router = express.Router();

const users = require("../models/users.js");

//Get all users
router.get("/", (req, res) => users.getUsers(req, res));

//Create user
router.post("/", (req, res) => users.createUser(req, res));

//Get user ID from passport created event (req.user)
router.get("/id", (req, res) => users.getUserID(req, res));

//Get specific user
router.get("/id/:user_id", (req, res) => {
    let user_id = req.params.user_id;
    users.getSpecificUser(req, res, user_id);
});

//Get history for specific user
router.get("/history/:user_id", (req, res) => {
    let user_id = req.params.user_id;
    users.getUserHistory(req, res, user_id);
});

//Get invoices for specific user
router.get("/invoice/:user_id", (req, res) => {
    let user_id = req.params.user_id;
    users.getUserInvoices(req, res, user_id);
});

//Get specific invoice for specific user
router.get("/invoice/:user_id/:invoice_id", (req, res) => {
    let user_id = req.params.user_id;
    let invoice_id = req.params.invoice_id;
    users.getSpecificUserInvoice(req, res, user_id, invoice_id);
});

//Update user
router.put("/id/:user_id", (req, res) => {
    let user_id = req.params.user_id;
    users.updateUser(req, res, user_id);
});

//Delete user
router.delete("/id/:user_id", (req, res) => {
    let user_id = req.params.user_id;
    users.deleteUser(req, res, user_id);
});

//Search for names
router.get("/name/:name", (req, res) => {
    let name = req.params.name;
    users.getMatchingUser(req, res, name);
});

module.exports = router;
