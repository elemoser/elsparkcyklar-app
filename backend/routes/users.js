
const express = require('express');
const router = express.Router();

const users = require("../models/users.js");

//Get all users
router.get('/', (req, res) => users.getUsers(req, res));

//Create user
router.post('/', (req, res) => users.createUser(req, res));

//Get specific user
router.get('/id/:user_id', (req, res) => {
    let user_id = req.params.user_id;
    users.getSpecificUser(req, res, user_id)
});

//Update user
router.put('/id/:user_id', (req, res) => {
    let user_id = req.params.user_id;
    users.updateUser(req, res, user_id);
});

//Delete user
router.delete('/id/:user_id', (req, res) => {
    let user_id = req.params.user_id;
    users.deleteUser(req, res, user_id);
});

//Search for names
router.get('/name/:name', (req, res) => {
    let name = req.params.name;
    users.getMatchingUser(req, res, name)
});


module.exports = router;