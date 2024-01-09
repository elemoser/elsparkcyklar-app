const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app-test.js"); // Replace with the path to your main app file
const Bike = require("../orm/model-router.js")("bike");
chai.use(chaiHttp);
const expect = chai.expect;
const baseRoute = "/v1/parking";

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


    it("GET /parking - GET all parkings", async () => {
        try {
            /**
             * Expect to succeed
             */
            const getParkings = await chai.request(app).get(`${baseRoute}`);
            expect(getParkings).to.have.status(200, "should succeed");
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it("GET /parking - GET specific parking", async () => {
        try {
            /**
             * Expect to succeed
             */
            const getSpecificParking = await chai
                .request(app)
                .get(`${baseRoute}/id/1`);
            expect(getSpecificParking).to.have.status(200, "should succeed");
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it("PUT /parking - Failed Parking", async () => {
        const dummyParking = {
            notAParking: 'notAParking'
        };

        try {
            const createParking = await chai
                .request(app)
                .put(`${baseRoute}/id/133713371337`)
                .send(dummyParking);
            expect(createParking).to.have.status(400);

        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it("DELETE /Parking - Delete Parking that doesn't exist", async () => {
        try {
            const deleteParking = await chai
                .request(app)
                .delete(`${baseRoute}/id/133713371337`)
                .send();
            expect(deleteParking).to.have.status(400);

        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }

    });
});
