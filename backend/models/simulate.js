const Simulate = require("../orm/model-router.js")("simulate");
const User = require("../orm/model-router.js")("user");
const Bike = require("../orm/model-router.js")("bike");
const { Op } = require("sequelize");
const simulate = {

    /**
     * @description Getting all bikes from sqlite db
     */
    startSimulation: async function startSimulation(req, res) {
        let intervalId;
        try {

            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'  // Denna behövs inte men gör det tydligare för klienten
            });
            let loop = 0; 
            // Set the amount of simulation trips that should be made (Max trips.length)
            const totalBikesToRun = 100;
            let simBikeStartIds = 10000 // is incremented by a trips id in: createSimulationBikes (first id is 10001)

            let trips = await this.getTrips();
            let simBikes = await this.createSimulationBikes(trips, simBikeStartIds); // Create and return bikes for the sim
            let simUsers = await this.getSimulationCustomers() 

            await this.createBooking(simBikes, simUsers, totalBikesToRun)
            intervalId = setInterval(async () => {
            
                // Set counter of total bikes (-1 to match arrays)
                let finishedCounter = trips.length - 1

                // Loop the new positons to see if they have a next position. If they dont they will return finished: true
                let newPosition = trips.map(trip => {
                    let nextPos = {
                        id: trip.id,
                        lat: trip.route[trip.route.length - 1][1],
                        lon: trip.route[trip.route.length - 1][0],
                        finished: true
                        }

                    // If they have a next pos they are still active in the simulation
                    // If finishCounter remains unchanged all bikes are done and the sim should be over
                    if (trip.route[loop] !== undefined) {
                        nextPos = {
                            id: trip.id,
                            city: trip.city,
                            lat: trip.route[loop][1],
                            lon: trip.route[loop][0],
                            finished: false
                            }
                            finishedCounter --;
                    }
                    return nextPos
                })
                // SSE must send text/string
                let jsonData = JSON.stringify(newPosition);
                if (finishedCounter === trips.length - 1) {
                    jsonData = JSON.stringify({simulationDone: true})
                    clearInterval(intervalId);
                }
                res.on('close', async () => {
                    console.log('Client closed the connection');
                    if (intervalId) {
                        clearInterval(intervalId);
                    }
                    await this.destroySimulationBikes(simBikeStartIds)
                });
                res.write(`data: ${jsonData}\n\n`);   

                if (trips.length - 1 == finishedCounter) {
                    res.end();
                    console.log("\n\n\nSLUUUUT\n\n");
                    await this.destroySimulationBikes(simBikeStartIds)
                }

                loop++; // Increment to next position value
            },1000);
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
        getTrips: async function getTrips(req, res) {
            try {
                const trips = await Simulate.findAll();
                const parsedTrips = trips.map((trip) => {
                    const parsedTrip = { ...trip }; // Create a shallow copy of the trip object
                    parsedTrip.dataValues.bike_route = JSON.parse(parsedTrip.dataValues.bike_route); // Parse the bike_route property
                    return {id: parsedTrip.dataValues.id,city: parseInt(parsedTrip.dataValues.city_id), route: parsedTrip.dataValues.bike_route};
                });
                console.log("🚀 ~ file: simulate.js:117 ~ getTrips ~ parsedTrips:", parsedTrips[0].route)
                return parsedTrips
            } catch (err) {
                console.error("Error in getTrips:", err);
                return err ;
            }
        },
    /**
     * @description Getting all generated simulation trips from sqlite db
     */
        getSimulationCustomers: async function getSimulationCustomers(req, res) {
            try {
                const simUserStartId = 9005001
                const users = await User.findAll({where: {
                    id: {
                        [Op.lte]: simUserStartId
                    }
                }
                },);
                return users
            } catch (err) {
                console.error("Error in getSimulationCustomers:", err);
                return err ;
            }
        },
    /**
     * @description Getting all generated simulation trips from sqlite db
     */
        createSimulationBikes: async function createSimulationBikes(trips, simBikeStartIds) {
            try {
                const simulationBikes = await trips.map( (trip) => {
                    return {
                        // The bike id is assigned by adding the trip.id of the trip used to provide the bike starting position
                        // This makes it possible to match them later in the simulation without using a connecting sqlite table. 
                        // The bikes will always be created with the trip-data as a blueprint. and the first bike will always be 
                        // have the id 10001 as all simbikes start at 10000 + the trip.id used. 
                        // To clarify, bike 10001 will be matched with trip.id = 1
                        id: simBikeStartIds + trip.id,
                        city_id: trip.city, 
                        position:  `${trip.route[0][1]}, ${trip.route[0][0]}`,
                        battery: Math.ceil((Math.random() * (100 - 60) + 60)),
                        speed: 10,
                        state: "available"
                    }
                })  
                const bikes = await Bike.bulkCreate(simulationBikes);

                return bikes
            } catch (err) {
                console.error("Error in createSimulationBikes:", err);
                return err ;
            }
        },
    /**
     * @description Getting all generated simulation trips from sqlite db
     */
        destroySimulationBikes: async function destroySimulationBikes(simBikeStartIds) {
            try {
                const condition = {
                    where: {
                        id: {
                            [Op.gte]: simBikeStartIds
                        }
                    },
                    // limit: simBikeStartIds + 3, // Limit the number of rows to delete to 1000
                };
                await Bike.destroy(condition);
            } catch (err) {
                console.error("Error in destroySimulationBikes:", err);
                return err ;
            }
        },
    /**
     * @description Getting all generated simulation trips from sqlite db
     */
        createBooking: async function createBooking(simBikes, simUsers, numberSimsToRun) {
            try {
                let booking
                for (let i = 0; i < numberSimsToRun; i++) {
                    
                    booking = await fetch("http://localhost:1338/v1/booking", {
                        method: "POST",
                        body: JSON.stringify({
                            bike_id: simBikes[i].dataValues.id,
                            user_id: simUsers[i].dataValues.id
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    });
                }
                    return booking
            } catch (err) {
                console.error("Error in createBooking:", err);
                return err ;
            }
        },
        endTrip: async function endTrip(bikeId, userId) {
            try {
                const booking = await fetch("http://localhost:1338/v1/booking", {
                    method: "PUT",
                    body: JSON.stringify({
                        bike_id: bikeId,
                        user_id: userId
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
                return booking
            } catch (err) {
                console.error("Error in ednTrip:", err);
                return err ;
            }
        },
}

module.exports = simulate;
