const bikeRoute = require("../bike-routes/1.json") 
const Simulate = require("../orm/model-router.js")("simulate");
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
            let trips = await this.getTrips();

            const intervalId = setInterval(() => {
            
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
                // console.log("🚀 ~ file: simulate.js:50 ~ intervalId ~ sonData:", jsonData)
                res.write(`data: ${jsonData}\n\n`);   

                if (trips.length - 1 == finishedCounter) {
                    res.end();
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
                return parsedTrips
            } catch (err) {
                console.error("Error in getTrips:", err);
                return err ;
            }
        },
        // getTrips: async function getTrips(req, res) {
        //     try {
        //         const trips = await Simulate.findAll();
        //         return res.status(200).json({ trips: trips });
        //     } catch (err) {
        //         console.error("Error in getTrips:", err);
        //         return res.status(500).json({ err: err.message }); 
        //     }
        // },
}

module.exports = simulate;
