
//const { Op } = require("sequelize");
const Bike = require("../orm/model-router.js")("bike"); // Import bike db-model

const bike = {
    /**
     * @description Getting all bikes from sqlite db
     */
    getBikes: async function getBikes(req, res) {
        try {
            const bikes = await Bike.findAll();

            return res.json({ bike: bikes });
        } catch (err) {
            console.error("Error in getBike:", err);
            return res.status(500).json({ err: err.message });
        }
    },
}

module.exports = bike;