const Simulate = require("../orm/model-router.js")("simulate");
const User = require("../orm/model-router.js")("user");
const Bike = require("../orm/model-router.js")("bike");
// const Booking = require("../orm/model-router.js")("booking");
const { Op } = require("sequelize");
const baseUrl = "http://localhost:1338";
const simUsersOnlyBelowThis = 9005001; // used to get all simulator users as they start on 900001
const maxSimBikes = 2000;
const minSimSpeedMs = 1000;
const simulate = {
    /**
     * @description Getting all bikes from sqlite db
     */
    startSimulation: async function startSimulation(
        req,
        res,
        totalBikesToRun = 500,
        simSpeed = 3
    ) {
        let intervalId;
        simSpeed *= 1000;
        try {
            simSpeed = simSpeed < minSimSpeedMs ? minSimSpeedMs : simSpeed; // Set simSpeed max speed at minSimSpeedMs ms
            totalBikesToRun =
                totalBikesToRun > maxSimBikes ? maxSimBikes : totalBikesToRun; // Set max simbikes for sim

            // Open SSE connection
            res.writeHead(200, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive", // Denna behövs inte men gör det tydligare för klienten
            });
            let loop = 0;
            // Set the amount of simulation trips that should be made (Max trips.length)
            let simBikeStartIds = 10000; // is incremented by a trips id in: createSimulationBikes (first id is 10001)

            let trips = await this.getTrips(totalBikesToRun);

            let simBikes;
            try {
                // Get bike with highest id
                const bikeExists = await Bike.findByPk(
                    simBikeStartIds + totalBikesToRun
                );

                // If it doesnt exist bikes will be created within given range
                if (!bikeExists) {
                    // Create bikes for the sim if the bike, if already created the id will be skipped and create next
                    await this.createSimulationBikes(trips, simBikeStartIds);
                }
            } finally {
                simBikes = await Bike.findAll({
                    // Get all bikes needed for sim
                    where: {
                        id: {
                            [Op.between]: [
                                simBikeStartIds,
                                simBikeStartIds + totalBikesToRun,
                            ],
                        },
                        state: {
                            [Op.ne]: "disabled",
                        },
                    },
                });

                let simBikesDisabled = await Bike.findAll({
                    // Get all disabled sim bikes
                    where: {
                        id: {
                            [Op.between]: [
                                simBikeStartIds,
                                simBikeStartIds + totalBikesToRun,
                            ],
                        },
                        state: {
                            [Op.eq]: "disabled",
                        },
                    },
                });

                // Extract the trip ids that match each bike by subtracting the simBikeStartId.
                // All simbikes should match a trip id when simBikeStartId is subtracted
                const simBikesDisabledArrId = simBikesDisabled.map(
                    (obj) => obj.dataValues.id - simBikeStartIds
                );
                // Filter out all simbikes that are disabled. Example for having battery = 0
                trips = trips.filter(
                    (obj) => !simBikesDisabledArrId.includes(obj.id)
                );
            }
            let simUsers = await this.getSimulationCustomers(
                parseInt(totalBikesToRun)
            );

            await this.createBooking(simBikes, simUsers, totalBikesToRun);
            const activeBookings = await this.getActiveBookings();

            intervalId = setInterval(async () => {
                // Set counter of total bikes (-1 to match arrays)
                let finishedCounter = trips.length - 1;

                let newPosition = [];
                for (const trip of trips) {
                    let nextPos = {
                        id: trip.id,
                        lat: trip.route[trip.route.length - 1][1],
                        lon: trip.route[trip.route.length - 1][0],
                        finished: true,
                    };

                    const id = parseInt(nextPos.id) + simBikeStartIds; // Id for finding a matching trip.
                    if (trip.route[loop] !== undefined) {
                        nextPos = {
                            id: trip.id,
                            city: trip.city,
                            lat: trip.route[loop][1],
                            lon: trip.route[loop][0],
                            finished: false,
                        };
                        finishedCounter--;
                    }
                    // console.log("\n\n\n\n",activeBookings);
                    if (
                        nextPos.finished &&
                        !activeBookings[`${id}`].isFinished
                    ) {
                        await this.updateBikePosition(
                            id,
                            nextPos.lat,
                            nextPos.lon
                        );
                        await this.endTrip(activeBookings[`${id}`].bookingId);
                        activeBookings[`${id}`].isFinished = true;
                    }
                    newPosition.push(nextPos);
                }

                // SSE must send text/string
                let jsonData = JSON.stringify(newPosition);
                if (finishedCounter === trips.length - 1) {
                    jsonData = JSON.stringify({ simulationDone: true });
                    clearInterval(intervalId);
                }
                res.on("close", async () => {
                    console.log("Client closed the connection");
                    if (intervalId) {
                        clearInterval(intervalId);
                    }
                });
                res.write(`data: ${jsonData}\n\n`);

                if (trips.length - 1 == finishedCounter) {
                    res.end();
                    console.log("\n\nEND OF SIMULATION\n\n");
                }

                loop++; // Increment to next position value
            }, simSpeed);
        } catch (err) {
            console.error("Error in simulate:", err);
            if (intervalId) {
                clearInterval(intervalId);
            }
            return res.status(500).json({ err: err.message });
        }
    },
    /**
     * @description Getting all generated simulation trips from sqlite db
     */
    getTrips: async function getTrips(totalTrips) {
        try {
            const trips = await Simulate.findAll();
            const parsedTrips = trips.map((trip) => {
                const parsedTrip = { ...trip }; // Create a shallow copy of the trip object
                parsedTrip.dataValues.bike_route = JSON.parse(
                    parsedTrip.dataValues.bike_route
                ); // Parse the bike_route property
                return {
                    id: parsedTrip.dataValues.id,
                    city: parseInt(parsedTrip.dataValues.city_id),
                    route: parsedTrip.dataValues.bike_route,
                };
            });
            return parsedTrips.filter((trip) => trip.id <= totalTrips);
        } catch (err) {
            console.error("Error in getTrips:", err);
            return err;
        }
    },
    /**
     * @description Getting all generated simulation trips from sqlite db
     */
    getSimulationCustomers: async function getSimulationCustomers(customers) {
        try {
            const users = await User.findAll({
                where: {
                    id: {
                        [Op.lte]: 9000000 + customers,
                    },
                },
            });
            return users;
        } catch (err) {
            console.error("Error in getSimulationCustomers:", err);
            return err;
        }
    },
    /**
     * @description Getting all generated simulation trips from sqlite db
     */
    createSimulationBikes: async function createSimulationBikes(
        trips,
        simBikeStartIds
    ) {
        try {
            const simulationBikes = await trips.map((trip) => {
                return {
                    // The bike id is assigned by adding the trip.id of the trip used to provide the bike starting position
                    // This makes it possible to match them later in the simulation without using a connecting sqlite table.
                    // The bikes will always be created with the trip-data as a blueprint. and the first bike will always be
                    // have the id 10001 as all simbikes start at 10000 + the trip.id used.
                    // To clarify, bike 10001 will be matched with trip.id = 1
                    id: simBikeStartIds + trip.id,
                    city_id: trip.city,
                    position: `${trip.route[0][1]}, ${trip.route[0][0]}`,
                    battery: Math.ceil(Math.random() * (100 - 80) + 80),
                    speed: 10,
                    state: "available",
                    low_battery: 0,
                };
            });
            // First bike will have low battery on first simulation, any subsequent simulations
            // the first bike will most likely lack battery and will therefore be filtered out.
            // simulationBikes[0].battery = 1; NOT ENOUGH ERROR HANDLING SO IS COMMENTED OUT FOR NOW
            const bikes = await Bike.bulkCreate(simulationBikes, {
                ignoreDuplicates: true,
            });

            return bikes;
        } catch (err) {
            console.error("Error in createSimulationBikes:", err);
            return err;
        }
    },
    /**
     * @description Getting all generated simulation trips from sqlite db
     */
    destroySimulationBikes: async function destroySimulationBikes(
        simBikeStartIds
    ) {
        try {
            const condition = {
                where: {
                    id: {
                        [Op.gte]: simBikeStartIds,
                    },
                },
                // limit: simBikeStartIds + 3, // Limit the number of rows to delete to 1000
            };
            await Bike.destroy(condition);
        } catch (err) {
            console.error("Error in destroySimulationBikes:", err);
            return err;
        }
    },
    /**
     * @description Getting all generated simulation trips from sqlite db
     */
    createBooking: async function createBooking(
        simBikes,
        simUsers,
        numberSimsToRun
    ) {
        try {
            let booking;
            for (let i = 0; i < numberSimsToRun; i++) {
                booking = await fetch(`${baseUrl}/v1/booking`, {
                    method: "POST",
                    body: JSON.stringify({
                        bike_id: simBikes[i].dataValues.id,
                        user_id: simUsers[i].dataValues.id,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                });
            }
            return booking;
        } catch (err) {
            console.error("Error in createBooking:", err);
            return err;
        }
    },
    getActiveBookings: async function getActiveBookings() {
        try {
            const response = await fetch(`${baseUrl}/v1/booking/ongoing`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
            const activeBookings = await response.json();
            const filteredActiveBookings = activeBookings.booking.reduce(
                (acc, aBooking) => {
                    if (aBooking.user_id < simUsersOnlyBelowThis) {
                        acc[aBooking.bike_id] = {
                            bookingId: aBooking.id,
                            isFinished: false,
                        };
                    }
                    return acc;
                },
                {}
            );
            return filteredActiveBookings;
        } catch (err) {
            console.error("Error in getActiveBookings:", err);
            return err;
        }
    },
    endTrip: async function endTrip(bookingId) {
        try {
            const booking = await fetch(
                `${baseUrl}/v1/booking/id/${bookingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            );
            return booking;
        } catch (err) {
            console.error("Error in ednTrip:", err);
            return err;
        }
    },
    updateBikePosition: async function updateBikePosition(bikeId, lat, lon) {
        try {
            const bikeUpdatedPos = await fetch(
                `${baseUrl}/v1/bikes/position/${bikeId}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        position: `${lat}, ${lon}`,
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                }
            )
                .then((response) => {
                    console.log("Status Code:", response.status); // Logs the status code
                    return response.json(); // Assuming the response is in JSON format
                })
                .then((data) => {
                    console.log("Response Data:", data); // Logs the response data
                })
                .catch((error) => {
                    console.error("Error:", error); // Logs any error that occurred during the fetch
                });
            return bikeUpdatedPos;
        } catch (err) {
            console.error("Error in updateBikePosition:", err);
            return err;
        }
    },
};

module.exports = simulate;
