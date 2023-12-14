const bikeRoute = require("../bike-routes/1.json") 
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
            let data
            const intervalId = setInterval(() => {
                if (bikeRoute.trips[0].coords.length == loop) {
                    data = "end"; 
                    clearInterval(intervalId);
                } else {
                    data = JSON.stringify([bikeRoute.trips[0].coords[loop][1], bikeRoute.trips[0].coords[loop][0]])
                }
                res.write(`data: ${data}\n\n`); 

                if (bikeRoute.trips[0].coords.length == loop) {
                    res.end(); }
                loop++; // Increment to next position value
            }, 1000);

        } catch (err) {
            console.error("Error in getBike:", err);
            return res.status(500).json({ err: err.message });
        }
    },

}

module.exports = simulate;
