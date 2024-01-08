const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app-test.js"); // Replace with the path to your main app file
const Charger = require("../orm/model-router.js")("charger");
const Bike = require("../orm/model-router.js")("bike");
chai.use(chaiHttp);
const expect = chai.expect;
const baseRoute = "/v1/charger";

describe("Api test suite", () => {
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

        await chai.request(app).post(`/v1/bikes`).send(dummyBike);
    });

    after(async () => {
        await Bike.destroy({
            where: {
                id: 1337,
            },
        })
    });


    it("GET /charger - GET all chargers", async () => {
        try {
            /**
             * Expect to succeed
             */
            const getChargers = await chai.request(app).get(`${baseRoute}`);
            expect(getChargers).to.have.status(200, "should succeed");
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it("POST /charger - Create charger", async () => {
        const dummyCharger = {
            parking_id: 1,
            bike_id: 0,
            status: "available"
        };

        try {
            const createCharger = await chai
                .request(app)
                .post(`${baseRoute}`)
                .send(dummyCharger);
            expect(createCharger).to.have.status(200);
            console.log(createCharger.id);
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }

    });
});
