
const Booking = require("../orm/model-router.js")("booking");
const Bike = require("../orm/model-router.js")("bike");
const User = require("../orm/model-router.js")("user");
const Invoice = require("../orm/model-router.js")("invoice");
const { getRandomInt } = require("./utils.js")
const { Op } = require("sequelize");


const booking = {
    /**
     * @description Getting all bookings from sqlite db
     */
    getAllBookings: async function getAllBookings(req, res) {
        try {
            const booking = await Booking.findAll();

            return res.json({ booking: booking });
        } catch (err) {
            console.error("Error in getBookings:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Getting all LIVE bookings
     */
    getOngoing: async function getOngoing(req, res) {
        try {
            const booking = await Booking.findAll({
                where: {
                    stop_time: {
                        [Op.eq]: ""
                    }
                }
            });

            return res.json({ booking: booking });
        } catch (err) {
            console.error("Error in getBookings:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Create new booking
     *
     */
    createBooking: async function createBooking(req, res) {
        try {
            /* Hämta attribut från req.body */
            let {
                id,
                bike_id,
                user_id,
            } = req.body;

            if (!id || !bike_id || !user_id) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            const checkUser = await User.findOne({
                where: {
                    id: user_id,
                }
            });

            if (!checkUser) {
                return res.status(400).json({ error: "User doesn't exist" });
            } else if (checkUser.balance === 0) {
                return res.status(400).json({ error: "Balance is too low" });
            }

            //Hämta alla bokingar och kolla om användaren redan har en bokning
            const bookings = await Booking.findAll({
                where: {
                    user_id: checkUser.id
                }
            });

            const hasBooking = bookings.some(booking => (booking.stop_time === ""));

            if (hasBooking) {
                return res.status(400).json({ error: "User already has an active booking" });
            }

            const checkBike = await Bike.findOne({
                where: {
                    id: bike_id,
                }
            });

            if (!checkBike) {
                return res.status(400).json({ error: "Bike doesn't exist" });
            } else if (checkBike.state !== 'available') {
                return res.status(400).json({ error: "Bike is not available" });
            }

            const currentTimestamp = Date.now(); //Skapa ett datum
            const currentDate = new Date(currentTimestamp);

            //Fånga år, måndag, dag, tid
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');

            const startTimeStamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; //Formatera tidsstämpeln

            //Sätt startpriset till 0 kronor om det är en subscriber, annars 10 kronor
            let price = checkUser.subscriber === 1 ? 0 : 10;

            const newBooking = await Booking.create({
                id: parseInt(id),
                bike_id: parseInt(bike_id),
                user_id: parseInt(user_id),
                start_time: startTimeStamp,
                start_location: checkBike.position,
                stop_time: "",
                stop_location: "",
                price: parseFloat(price)
            });

            let bikeSpeed = getRandomInt(5, 25);

            //Uppdatera status och hastighet för den uthyrda cykeln
            checkBike.update({
                state: 'occupied',
                speed: parseFloat(bikeSpeed)
            })

            res.status(200).json({ message: "Booking created successfully", booking: newBooking });
        } catch (err) {
            console.error("Error in createBooking:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Update booking - (end a trip)
     *
     */
    endTrip: async function endTrip(req, res, booking_id) {
        try {
            /* Kontrollera om bokningen finns och inte redan är avslutad*/
            const existingBooking = await Booking.findOne({
                where: {
                    id: booking_id,
                },
                include: [
                    {
                        model: Bike,
                        as: "bike",
                        attributes: ['position'],
                    },
                ],
            });

            if (!existingBooking) {
                return res.status(404).json({ error: "Booking doesn't exist" });
            } else if (existingBooking.stop_time != "") {
                return res.status(400).json({ error: "Trip is already stopped" });
            }

            const currentTimestamp = Date.now(); //Skapa ett datum
            const currentDate = new Date(currentTimestamp);

            //Fånga år, måndag, dag, tid
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const seconds = currentDate.getSeconds().toString().padStart(2, '0');

            const stopTimeStamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; //Formatera tidsstämpeln

            const bikeId = existingBooking.bike_id;
            const userId = existingBooking.user_id;

            const startTime = existingBooking.start_time;
            const startLocation = existingBooking.start_location;
            const stopLocation = existingBooking.bike.position;
            const price = existingBooking.price;

            //hämta aktuell cykel samt justera batteri-nivån och tillgänglighet
            const existingBike = await Bike.findByPk(bikeId);
            const batteryLevel = existingBike.battery - getRandomInt(5, 20);

            await existingBike.update({
                state: "Available",
                battery: batteryLevel
            });

            //skapa faktura för aktuell användare
            await Invoice.create({
                log_id: parseInt(booking_id),
                user_id: parseInt(userId),
                total_price: parseFloat(price),
                status: "pending"
            });

            await existingBooking.update({
                booking_id: parseInt(booking_id),
                bike_id: parseInt(bikeId),
                user_id: parseInt(userId),
                start_time: startTime,
                start_location: startLocation,
                stop_time: stopTimeStamp,
                stop_location: stopLocation,
                price: parseFloat(price),
            });

            res.status(200).json({
                message: "Booking successfully updated. Trip is now stopped"
            });

            } catch (err) {
                console.error("Error in deleteBooking:", err);
                res.status(500).json({ error: err.message });
        }
    },
}

module.exports = booking;
