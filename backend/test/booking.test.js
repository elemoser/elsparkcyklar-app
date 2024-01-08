const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app-test.js"); // Replace with the path to your main app file
const Booking = require("../orm/model-router.js")("booking");
const User = require("../orm/model-router.js")("user");
const Bike = require("../orm/model-router.js")("bike");

chai.use(chaiHttp);
const expect = chai.expect;
const baseRoute = "/v1/booking";
const { Op } = require("sequelize");

describe("Api test suite for the booking/ routes", () => {
    before(async () => {
        const dummyBike = {
            id: 1337,
            battery: 17,
            city_id: 1,
            speed: 0.00,
            state: 'available',
            position: '59.3293, 18.0686',
            low_battery: 0
        };

        // Skapa testanvändare
        const dummyUser = {
            id: 2101010018,
            username: 'dummy_guy',
            role: 'admin',
            balance: 0
        };

        await chai.request(app).post(`/v1/bikes`).send(dummyBike);

        await chai.request(app).post(`/v1/users`).send(dummyUser);

    });

    after(async () => {
        await Bike.destroy({
            where: {
                id: 1337,
            },
        })

        await User.destroy({
            where: {
                id: 2101010018
            },
        })

    });

    it("GET v1/booking - Get bookings", async () => {
        try {
            const getBookings = await chai
                .request(app)
                .get(`${baseRoute}`)
                .send();
            expect(getBookings,
                "Should be 200 unless the server is down")
                .to.have.status(200, "Got bookings");
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it("GET v1/booking - Get ongoing bookings", async () => {
        try {
            const getBookings = await chai
                .request(app)
                .get(`${baseRoute}/ongoing`)
                .send();
            expect(getBookings,
                "Should be 200 unless the server is down")
                .to.have.status(200, "Got ongoing bookings");
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it("POST /v1/booking - Create booking with missing params, should fail", async () => {
        try {
            const failedBooking = await chai
                .request(app)
                .post(`${baseRoute}`)
                .send();
            expect(failedBooking).to.have.status(400);
            expect(failedBooking.body.error).to.equal("Missing required fields");
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });
});
