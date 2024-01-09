const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app-test.js"); // Replace with the path to your main app file
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
            speed: 0.0,
            state: "available",
            position: "59.3293, 18.0686",
            low_battery: 0,
        };

        await chai.request(app).post(`/v1/bikes`).send(dummyBike);
    });

    after(async () => {
        await Bike.destroy({
            where: {
                id: 1337,
            },
        });
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

    it("GET /charger - GET specific charger", async () => {
        try {
            /**
             * Expect to succeed
             */
            const getChargers = await chai
                .request(app)
                .get(`${baseRoute}/id/1`);
            expect(getChargers).to.have.status(200, "should succeed");
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it("GET /charger - GET charger by status", async () => {
        try {
            /**
             * Expect to succeed
             */
            const getChargers = await chai
                .request(app)
                .get(`${baseRoute}/search/available`);
            expect(getChargers).to.have.status(200, "should succeed");
            expect(getChargers.body.chargers).to.be.an("array");
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it("PUT /charger - Update charger that doesn't exist", async () => {
        const dummyCharger = {
            parking_id: 1,
            bike_id: 0,
            status: "mumin",
        };

        try {
            const createCharger = await chai
                .request(app)
                .put(`${baseRoute}/id/133713371337`)
                .send(dummyCharger);
            expect(createCharger).to.have.status(404);
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it("DELETE /charger - Delete charger that doesn't exist", async () => {
        try {
            const deleteCharger = await chai
                .request(app)
                .delete(`${baseRoute}/id/133713371337`)
                .send();
            expect(deleteCharger).to.have.status(404);
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });
});
