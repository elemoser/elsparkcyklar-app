const bikeRoute = require("../bike-routes/1.json") 
const Simulate = require("../orm/model-router.js")("simulate");
const Bike = require("../orm/model-router.js")("bike");
const { Op } = require("sequelize");
const simulate = {

    /**
     * @description Getting all bikes from sqlite db
     */
    startSimulation: async function startSimulation(req, res) {
        try {

            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive'  // Denna behövs inte men gör det tydligare för klienten
            });
            let loop = 0;
            let simBikeStartIds = 9999 // is incremented by a trips id in: createSimulationBikes (first id is 10000)
            let trips = await this.getTrips();
            // let simBikes = await this.createSimulationBikes(trips, simBikeStartIds);
            // await this.destroySimulationBikes(simBikeStartIds)   

            // const as = fetch("http://localhost:1338/v1/booking", {
            //     method: "GET",
            //     headers: {
            //         "Content-type": "application/json; charset=UTF-8"
            //     }
            // });
            // const response = await fetch(`http://localhost:1338/v1/city`, {
            //     method: 'GET',
            //     credentials: 'include'
            // });
            const intervalId = setInterval(async () => {
            // console.log("🚀 ~ file: simulate.js:30 ~ startSimulation ~ as:", as)
            
                // Set counter of total bikes (-1 to match arrays)
                let finishedCounter = trips.length - 1

                // Loop the new positons to see if they have a next position. If they dont they will return finished: true
                let newPosition = trips.map(trip => {
                    let nextPos = {
                        id: trip.id,
                        lat: trip.route[trip.route.length -1][1],
                        lon: trip.route[trip.route.length -1][0],
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
        createSimulationBikes: async function createSimulationBikes(trips, simBikeStartIds) {
            try {
                const simulationBikes = await trips.map( (trip) => {
                    return {
                        id: simBikeStartIds + trip.id, 
                        city_id: trip.city, 
                        position:  `${trip.route[0][1]}, ${trip.route[0][0]}`,
                        battery: Math.ceil((Math.random() * (100 - 60) + 60)),
                        speed: 10,
                        state: "available"
                    }
                })  
                const as = await Bike.bulkCreate(simulationBikes);
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
}

module.exports = simulate;
