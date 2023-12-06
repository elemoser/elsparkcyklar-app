
//const { Op } = require("sequelize");
const Parking = require("../orm/model-router.js")("parking");
const City = require("../orm/model-router.js")("city");

const parking = {
    /**
     * @description Getting all parkings from sqlite db
     */
    getParkings: async function getParkings(req, res) {
        try {
            const parkings = await Parking.findAll();

            return res.json({ parking: parkings });
        } catch (err) {
            console.error("Error in getParking:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Get specific parking based on ID
     *
     */
    getSpecificParking: async function getSpecificParking(req, res, parking_id) {
        try {
            const specParking = await Parking.findOne({
                where: { id: parking_id },
            });

            if (!specParking) {
                return res.status(404).json({ error: "No matching id" });
            }

            return res.json({ parking: specParking });
        } catch (err) {
            console.error("Error in getSpecificParking:", err);
            return res.status(500).json({ err: err.message });
        }
    },


    /**
     * @description Create new parking
     *
     */
    createParking: async function createParking(req, res) {
        try {
            /* Hämta attribut från req.body */
            let {
                id,
                city_id,
                name,
                bounds,
                number_of_chargers,
            } = req.body;

            if (!id ||
                !city_id ||
                !name ||
                !bounds
                ) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            number_of_chargers = number_of_chargers || 0;

            if (isNaN(id) || isNaN(city_id) || isNaN(number_of_chargers)) {
                return res.status(400).json({ error: "Id, city_id and number_of_chargers must be numbers" });
            }

            const findCity = await City.findByPk(city_id);

            if (!findCity) {
                return res.status(400).json({ error: "City doesn't exist!" });
            }

            const coordinatesPattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)(,\s*[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?))*$/;

            function isValidCoordinates(coordinates) {
                return coordinatesPattern.test(coordinates);
            }

            if (isValidCoordinates(bounds) && bounds.length === 30) {
                const newParking = await Parking.create({
                    id: parseInt(id),
                    city_id: parseInt(city_id),
                    name: name,
                    bounds: bounds,
                    number_of_chargers: parseInt(number_of_chargers)
                });

            res.status(200).json({ message: "parking created successfully", parking: newParking });

            } else {
                res.status(400).json({ error: "Invalid coordinates format" });
            }

        } catch (err) {
            console.error("Error in createUser:", err);
            res.status(500).json({ error: err.message });
        }
    },
}

module.exports = parking;