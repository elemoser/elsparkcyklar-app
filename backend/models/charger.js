const { Op } = require("sequelize");

const Charger = require("../orm/model-router.js")("charger");
const Bike = require("../orm/model-router.js")("bike");
const Parking = require("../orm/model-router.js")("parking");

function lowerFirst(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

const charger = {
    /**
     * @description Getting all Chargers from sqlite db
     */
    getChargers: async function getChargers(req, res) {
        try {
            const chargers = await Charger.findAll();

            return res.json({ chargers: chargers });
        } catch (err) {
            console.error("Error in getCharger:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Get specific Charger based on ID
     *
     */
    getSpecificCharger: async function getSpecificCharger(
        req,
        res,
        charger_id
    ) {
        try {
            const specCharger = await Charger.findByPk(charger_id);

            if (!specCharger) {
                return res.status(404).json({ error: "No matching id" });
            }

            return res.json({ charger: specCharger });
        } catch (err) {
            console.error("Error in getSpecificCharger:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Get all chargers matching the status-search
     *
     */
    findChargersByStatus: async function findChargersByStatus(
        req,
        res,
        status
    ) {
        try {
            const chargers = await Charger.findAll({
                where: {
                    status: {
                        [Op.like]: `%${lowerFirst(status)}%`,
                    },
                },
            });

            if (chargers.length == 0) {
                return res.status(404).json({ error: "No chargers matched" });
            }

            return res.json({ chargers: chargers });
        } catch (err) {
            console.error("Error in findChargersByStatus:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Create new charger
     *
     */
    createCharger: async function createCharger(req, res) {
        try {
            /* Hämta attribut från req.body */
            let { parking_id } = req.body;

            if (!parking_id) {
                return res
                    .status(400)
                    .json({ error: "Missing required fields" });
            }

            let bike_id = 0;
            let status = "available";

            if (isNaN(parking_id)) {
                return res
                    .status(400)
                    .json({ error: "Id and parking_id must be numbers" });
            }

            const getParkings = await Parking.findAll();
            const parkingIds = getParkings.map((parking) =>
                parseInt(parking.id)
            );

            if (!parkingIds.includes(parseInt(parking_id))) {
                return res.status(400).json({
                    error: `Parking_id must be one of: ${parkingIds}`,
                });
            }

            const newCharger = await Charger.create({
                parking_id: parseInt(parking_id),
                bike_id: parseInt(bike_id),
                status: status,
            });

            const updateParking = await Parking.findByPk(parking_id);

            await updateParking.update({
                number_of_chargers: updateParking.number_of_chargers + 1,
            });

            res.status(200).json({
                message: "Charger created successfully",
                charger: newCharger,
            });
        } catch (err) {
            console.error("Error in createUser:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Uppdatera cykel
     *
     */
    updateCharger: async function updateCharger(req, res, charger_id) {
        try {
            /* Kontrollera om cykeln finns via primary key (PK) */
            const existingCharger = await Charger.findByPk(charger_id);

            if (!existingCharger) {
                return res.status(404).json({ error: "Charger doesn't exist" });
            }

            let { parking_id, bike_id, status } = req.body;

            //Sätt optionella värden till nya eller ursprungliga värden
            parking_id = parking_id || existingCharger.parking_id;
            bike_id = bike_id || existingCharger.bike_id;
            status = status || existingCharger.status;

            const getParkings = await Parking.findAll();
            const parkingIds = getParkings.map((parking) =>
                parseInt(parking.id)
            );

            if (!parkingIds.includes(parseInt(parking_id))) {
                return res.status(400).json({
                    error: `Parking_id must be one of: ${parkingIds}`,
                });
            }

            if (bike_id != 0) {
                const existingBike = await Bike.findByPk(bike_id);

                if (!existingBike) {
                    return res
                        .status(404)
                        .json({ error: "Bike doesn't exist" });
                }
            }

            const acceptedStatus = ["available", "occupied"];

            if (!acceptedStatus.includes(status)) {
                return res.status(400).json({
                    error: `'status' must be one of: ${acceptedStatus}`,
                });
            }

            if (bike_id == 0 && status != "available") {
                return res.status(400).json({
                    error: "If no bike is using the charger, status should be 'available'",
                });
            }

            await existingCharger.update({
                parking_id: parseInt(parking_id),
                bike_id: parseInt(bike_id),
                status: status,
            });

            res.status(200).json({ message: "Charger updated successfully" });
        } catch (err) {
            console.error("Error in updateCharger:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Delete Charger
     *
     */
    deleteCharger: async function deleteCharger(req, res, charger_id) {
        try {
            /* Kontrollera om cykeln finns */
            const existingCharger = await Charger.findByPk(charger_id);

            if (!existingCharger) {
                return res.status(404).json({ error: "Charger doesn't exist" });
            }

            const updateParking = await Parking.findByPk(
                existingCharger.parking_id
            );

            await updateParking.update({
                number_of_chargers: updateParking.number_of_chargers - 1,
            });

            await existingCharger.destroy();

            res.status(200).json({ message: "Charger successfully deleted" });
        } catch (err) {
            console.error("Error in deleteCharger:", err);
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = charger;
