const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app-test.js"); // Replace with the path to your main app file
chai.use(chaiHttp);
const expect = chai.expect;
const baseRoute = "/v1/price";

describe("Api test suite", () => {
    it("GET /price - GET all prices", async () => {
        try {
            /**
             * Expect to succeed
             */
            const getPrices = await chai.request(app).get(`${baseRoute}`);
            expect(getPrices).to.have.status(200, "should succeed");
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });
});
