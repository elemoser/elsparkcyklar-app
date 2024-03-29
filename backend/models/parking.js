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
    getSpecificParking: async function getSpecificParking(
        req,
        res,
        parking_id
    ) {
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
            let { city_id, name, center, radius, number_of_chargers } =
                req.body;

            if (!city_id || !name || !center) {
                return res
                    .status(400)
                    .json({ error: "Missing required fields" });
            }

            number_of_chargers = number_of_chargers || 0;
            radius = radius || 500;

            if (isNaN(city_id) || isNaN(number_of_chargers) || isNaN(radius)) {
                return res.status(400).json({
                    error: "Id, city_id and number_of_chargers must be numbers",
                });
            }

            const findCity = await City.findByPk(city_id);

            if (!findCity) {
                return res.status(400).json({ error: "City doesn't exist!" });
            }
            if (center.length >= 14 && center.length <= 18) {
                const newParking = await Parking.create({
                    city_id: parseInt(city_id),
                    name: name,
                    center: center,
                    radius: parseInt(radius),
                    number_of_chargers: parseInt(number_of_chargers),
                });

                res.status(200).json({
                    message: "Parking created successfully",
                    parking: newParking,
                });
            } else {
                res.status(400).json({ error: "Invalid coordinates format" });
            }
        } catch (err) {
            console.error("Error in createUser:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Uppdatera parkering
     *
     */
    updateParking: async function updateParking(req, res, parking_id) {
        try {
            /* Hämta attribut från req.body */
            let { name, center, radius, number_of_chargers } = req.body;

            const existingParking = await Parking.findByPk(parking_id);

            if (!existingParking) {
                return res
                    .status(400)
                    .json({ error: "Parking doesn't exist!" });
            }

            //Optional parameter
            name = name || existingParking.name;
            center = center || existingParking.center;
            radius = radius || existingParking.radius;
            number_of_chargers =
                number_of_chargers || existingParking.number_of_chargers;

            if (isNaN(number_of_chargers) || isNaN(radius)) {
                return res.status(400).json({
                    error: "'number_of_chargers' and 'radius' must be a number",
                });
            }
            if (center.length >= 14 && center.length <= 18) {
                const updateParking = await existingParking.update({
                    name: name,
                    center: center,
                    radius: parseInt(radius),
                    number_of_chargers: parseInt(number_of_chargers),
                });

                res.status(200).json({
                    message: "parking updated successfully",
                    parking: updateParking,
                });
            } else {
                res.status(400).json({ error: "Invalid coordinates format" });
            }
        } catch (err) {
            console.error("Error in updateUser:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Delete Parking
     *
     */
    deleteParking: async function deleteParking(req, res, parking_id) {
        try {
            /* Kontrollera om fakturan finns */
            const existingParking = await Parking.findByPk(parking_id);

            if (!existingParking) {
                return res
                    .status(400)
                    .json({ error: "Parking doesn't exist!" });
            }

            await existingParking.destroy();

            res.status(200).json({ message: "Parking successfully deleted" });
        } catch (err) {
            console.error("Error in deleteParking:", err);
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = parking;
