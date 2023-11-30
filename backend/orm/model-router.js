
const path = require('path');

/**
 * @module module-router
 * @description The purpose of this module is to keep the code in backend/models/*.js DRY. This module removes the
 * need for pasting all the code below in every model created in backend/models/*.js.
 * Simply use -> const User = require("../orm/model-router.js")("user");
 * To get the db-models user module.
 */
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.resolve(__dirname, "../../db/bikr.db")
});

/**
 * @function returnModel
 * @param {string} chooseModel
 * @returns a model from orm/db-models that matche chooseModel
 * @description Pass the name of a module under db-models to get the matchin model for the table you are quering.
 */
const returnModel = (chooseModel) => {
    const chosenModel = require(`./db-models/${chooseModel}`)(
        sequelize,
        DataTypes
    );
    return chosenModel;
};
module.exports = returnModel;
