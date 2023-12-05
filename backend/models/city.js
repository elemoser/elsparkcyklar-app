
//const { Op } = require("sequelize");
const City = require("../orm/model-router.js")("city");

const city = {
    /**
     * @description Getting all cities from sqlite db
     */
    getCities: async function getCities(req, res) {
        try {
            const cities = await City.findAll();

            return res.json({ city: cities });
        } catch (err) {
            console.error("Error in getCity:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Get specific city based on ID
     *
     */
    getSpecificCity: async function getSpecificCity(req, res, city_id) {
        try {
            const specCity = await City.findOne({
                where: { id: city_id },
            });

            if (!specCity) {
                return res.status(404).json({ error: "No matching id" });
            }

            return res.json({ city: specCity });
        } catch (err) {
            console.error("Error in getSpecificCity:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Create new city
     *
     */
    createCity: async function createCity(req, res) {
        try {
            /* Hämta attribut från req.body */
            let {
                id,
                name,
                bounds
            } = req.body;

            if (!id || !name || !bounds) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const newCity = await City.create({
                id: parseInt(id),
                name,
                bounds
            });

            res.status(200).json({ message: "City created successfully", city: newCity });

        } catch (err) {
            console.error("Error in createUser:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Uppdatera användare
     *
     */
    updateCity: async function updateCity(req, res, city_id) {
        try {
            /* Kontrollera om staden finns via primary key (PK) */
            const existingCity = await City.findByPk(city_id);

            if (!existingCity) {
                return res.status(404).json({ error: "City doesn't exist" });
            }

            let {
                name,
                bounds
            } = req.body;

            //Sätt optionella värden till nya eller ursprungliga värden
            name = name || existingCity.name;
            bounds = bounds || existingCity.bounds;

            await existingCity.update({
                name,
                bounds
            });

            res.status(200).json({ message: "City updated successfully" });

        } catch (err) {
            console.error("Error in updateUser:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Delete city
     *
     */
    deleteCity: async function deleteCity(req, res, city_id) {
        try {
            /* Kontrollera om staden finns */
            const existingCity = await City.findByPk(city_id);

            if (!existingCity) {
                return res.status(404).json({ error: "City doesn't exist" });
            }

            await existingCity.destroy();

            res.status(200).json({ message: "City successfully deleted" });
        } catch (err) {
            console.error("Error in deleteCity:", err);
            res.status(500).json({ error: err.message });
        }
    },
}

module.exports = city;