
const { Op } = require("sequelize");

const City = require("../orm/model-router.js")("city");
const Bike = require("../orm/model-router.js")("bike");
const { upperFirst, isValidCoordinates } = require("./utils.js")
const coordinatesPattern = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;
const bike = {
    //regex för att kontrollera formatet på cykelns koordinater. Endast: '59.3293, 18.0686'-format bör passera

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

    /**
     * @description Create new bike
     *
     */
    createBike: async function createBike(req, res) {
        try {
            /* Hämta attribut från req.body */
            let {
                battery,
                city_id,
                speed,
                position,
                state
            } = req.body;

            if (
                !battery ||
                !city_id ||
                !position
                ) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            // Om en cykel är disabled kan den inte ha hastighet
            if (!speed || state != "occupied") {
                speed = 0.00;
            }

            //Default för cyklar utan state
            if (!state) {
                state = "available"
            }

            const validStates = ["occupied", "available", "disabled"];

            if (!validStates.includes(state)) {
                return res.status(400).json({
                    error: `'state' must be one of: ${validStates.join(', ')}`
                });
            }

            let low_battery = false;

            if (battery < 20) {
                low_battery = true;
            }

            if (isValidCoordinates(position, coordinatesPattern) && position.length === 16) {
                const newBike = await Bike.create({
                    battery: parseInt(battery),
                    city_id: parseInt(city_id),
                    speed: parseFloat(speed),
                    position,
                    state,
                    low_battery
                });

                res.status(200).json({ message: "Bike created successfully", bike: newBike });
            } else {
                return res.status(400).json({ error: "'position' is not formatted correctly" });
            }

        } catch (err) {
            console.error("Error in createUser:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Uppdatera cykel
     *
     */
    updateBike: async function updateBike(req, res, bike_id) {
        try {
            /* Kontrollera om cykeln finns via primary key (PK) */
            const existingBike = await Bike.findByPk(bike_id);

            if (!existingBike) {
                return res.status(404).json({ error: "Bike doesn't exist" });
            }

            let {
                battery,
                city_id,
                speed,
                position,
                state
            } = req.body;

            //Sätt optionella värden till nya eller ursprungliga värden
            battery = battery || existingBike.battery;
            city_id = city_id || existingBike.city_id;
            speed = speed || existingBike.speed;
            position = position || existingBike.position;
            state = state || existingBike.state;
            let low_battery = existingBike.low_battery;

            const existingCity = await City.findByPk(city_id);

            if (!existingCity) {
                return res.status(404).json({ error: "City doesn't exist" });
            }

            //Default för cyklar utan state
            if (!state) {
                state = "available"
            }

            const validStates = ["occupied", "available", "disabled"];

            if (!validStates.includes(state)) {
                return res.status(400).json({
                    error: `'state' must be one of: ${validStates.join(', ')}`
                });
            }

            // Om en cykel är ledig/trasig kan den inte ha hastighet
            if (!speed || state != "occupied") {
                speed = 0.00;
            }

            // regex för att kontrollera formatet på cykelns koordinater. Endast: '59.3293, 18.0686'-format bör passera
            

            if (battery < 20) {
                low_battery = true;
            }

            if (isValidCoordinates(position, coordinatesPattern) && position.length === 16) {
                await existingBike.update({
                    battery: parseInt(battery),
                    city_id: parseInt(city_id),
                    speed: parseFloat(speed),
                    position,
                    state,
                    low_battery
                });

                res.status(200).json({ message: "Bike updated successfully" });
            } else {
                return res.status(400).json({ error: "'position' is not formatted correctly" });
            }

        } catch (err) {
            console.error("Error in updateBike:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Get specific bike based on ID
     *
     */
    getSpecificBike: async function getSpecificBike(req, res, bike_id) {
        try {
            const specBike = await Bike.findOne({
                where: { id: bike_id },
            });

            if (!specBike) {
                return res.status(404).json({ error: "No matching id" });
            }

            return res.json({ bike: specBike });
        } catch (err) {
            console.error("Error in getSpecificBike:", err);
            return res.status(500).json({ err: err.message });
        }
    },

        /**
     * @description Get all available bikes in a specific city based on ID
     *
     */
    getAvailableBikes: async function getAvailableBikes(req, res, city_id) {
        try {
            const availableBikes = await Bike.findAll({
                where: [
                    { state: 'available' },
                    { city_id: city_id },
                ],
            });

            if (availableBikes.length == 0) {
                return res.status(404).json({ error: "No bikes available" });
            }

            return res.json({ bikes: availableBikes });
        } catch (err) {
            console.error("Error in getAvailableBikes:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Delete Bike
     *
     */
    deleteBike: async function deleteBike(req, res, bike_id) {
        try {
            /* Kontrollera om cykeln finns */
            const existingBike = await Bike.findByPk(bike_id);

            if (!existingBike) {
                return res.status(404).json({ error: "Bike doesn't exist" });
            }

            await existingBike.destroy();

            res.status(200).json({ message: "Bike successfully deleted" });
        } catch (err) {
            console.error("Error in deleteBike:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Get all bikes where city name matches
     *
     */
    getBikesInCity: async function getBikesInCity(req, res, city_name) {
        try {
            const matchingCities = await City.findAll({
                where: {
                    name: {
                        [Op.like]: `%${upperFirst(city_name)}%`,
                    },
                },
                attributes: ['id', 'name'],
            });

            if (matchingCities.length === 0) {
                return res.status(404).json({ error: "No matching cities" });
            }

            // Hämta cyklarna som är kopplade till de matchande städerna
            const matchingBikes = await Bike.findAll({
                where: {
                    city_id: {
                        [Op.in]: matchingCities.map(city => city.id),
                    },
                },
                include: [
                    {
                        model: City,
                        as: "city",
                        attributes: ['name'],
                    },
                ],
            });

            if (matchingBikes.length === 0) {
                return res.status(404).json({ error: "No bikes found" });
            }

            const formattedResult = matchingBikes.map(bike => ({
                id: bike.id,
                battery: bike.battery,
                city_id: bike.city_id,
                speed: bike.speed,
                position: bike.position,
                state: bike.state,
                city: bike.city.name
            }));
    
            return res.json({ bikes: formattedResult });

        } catch (err) {
            console.error("Error in getBikesInCity:", err);
            return res.status(500).json({ error: err.message });
        }
    },
}

module.exports = bike;
