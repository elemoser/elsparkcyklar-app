
const Booking = require("../orm/model-router.js")("booking");
const Bike = require("../orm/model-router.js")("bike");
const User = require("../orm/model-router.js")("user");

//const { Op } = require("sequelize");

const booking = {
    /**
     * @description Getting all bookings from sqlite db
     */
    getBookings: async function getBookings(req, res) {
        try {
            const booking = await Booking.findAll();

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
            const bookings = await Booking.findAll();

            const hasBooking = bookings.some(booking => booking.user_id === checkUser.id);

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

            res.status(200).json({ message: "Booking created successfully", booking: newBooking });
        } catch (err) {
            console.error("Error in createBooking:", err);
            res.status(500).json({ error: err.message });
        }
    },
}

module.exports = booking;
