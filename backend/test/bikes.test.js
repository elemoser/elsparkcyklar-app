const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app-test.js"); // Replace with the path to your main app file
const Bike = require("../orm/model-router.js")("bike");
chai.use(chaiHttp);
const expect = chai.expect;
const baseRoute = "/v1/bikes";
const { Op } = require("sequelize");

describe("Api test suite for the bike/ routes", () => {
    const NEVER_EXISTING_NUMBER = "9999999999999999";
    const ALWAYS_EXISTING_NUMBER = "1";
    const NEVER_EXISTING_NAME = "ABCDEFGHIJKLMNOPQRSTUVW";
    const ONES = 111111111111111111111111; // Used for forcing a catch
    const testIdForUpdate = 667;
    const mockBikeIdCreate = "999999";
    const mockBikeIdUpdate = "999998";
    beforeEach(async () => {
        await Bike.create({
            id: mockBikeIdUpdate,
            battery: 100,
            state: "available",
            city_id: 3,
            position: "57.7083, 11.9750",
        });
        // afterEach( async () => {
        //     await City.destroy({
        //         where: {
        //         id: 667,
        //         },
        //     });
        // })
    });
    afterEach(async () => {
        /**
        //  * Remove the data that was added
        //  */
        try {
            const destroyedRows = await Bike.destroy({
                where: {
                    [Op.or]: [
                        { id: mockBikeIdCreate },
                        { id: mockBikeIdUpdate },
                        { id: mockBikeIdCreate + 1 },
                        { id: mockBikeIdCreate + 2 },
                    ],
                },
            });

            console.log(`${destroyedRows} row(s) deleted.`);
        } catch (error) {
            console.error("Error deleting city:", error);
            throw error; // Rethrow the error to handle it elsewhere, if needed
        }
    });

    // ### Uppdatera en cykel
    // PUT /v1/bikes/id/[bike_id]

    // Please note that "id" can't be updated.
    // Optional parameters:
    // ```
    // battery
    // city_id
    // position
    // speed
    // state
    // ```
    // Result:
    // ```
    // status(200) - 'Bike updated successfully'
    // ```
    // Possible errors (if 'id' already exists):
    // ```
    // status(500) 'Validation error'
    // ```
    // ...or
    // ```
    // status(400) 'position' is not formatted correctly'
    // status(400) 'state' must be one of: "occupied", "available", "disabled"'

    it(" PUT /v1/bikes/id/[bike_id] - Update a bike", async () => {
        const updateBikeWrongCityId = {
            city_id: NEVER_EXISTING_NUMBER,
        };
        const newBikeIllegalBounds = {
            id: mockBikeIdCreate + 1,
            battery: 100,
            city_id: 2,
            position: "['57.7083, 11.9750']",
            speed: 25,
        };
        const newBikeAcceptedParams = {
            id: ALWAYS_EXISTING_NUMBER,
            battery: 100,
            city_id: ALWAYS_EXISTING_NUMBER,
            position: "57.1212, 11.1212",
            speed: 25,
        };
        const updateBadState = {
            state: "bad-state",
        };
        const updateExistingBikeParams = {
            state: "available",
            battery: 2,
            city_id: ALWAYS_EXISTING_NUMBER,
            position: "57.2002, 11.2002",
        };
        try {
            /**
             * Expect to fail as it doesnt exist, Also provide NO arguments
             */
            const updateNonExistingBike = await chai
                .request(app)
                .put(`${baseRoute}/id/${NEVER_EXISTING_NUMBER}`)
                .send();
            expect(updateNonExistingBike, "It shouldnt exist").to.have.status(
                404
            );
            expect(updateNonExistingBike.body.error).to.be.equal(
                "Bike doesn't exist"
            );

            /**
             * Update Bike with bad state
             */
            // Get bike before update
            const getBike = await chai
                .request(app)
                .get(`${baseRoute}/id/${ALWAYS_EXISTING_NUMBER}`);

            // Update bike with bad state
            const updateBadStateBike = await chai
                .request(app)
                .put(`${baseRoute}/id/${ALWAYS_EXISTING_NUMBER}`)
                .send(updateBadState);
            expect(updateBadStateBike, "It shouldnt update").to.have.status(
                400
            );
            expect(updateBadStateBike.body.error).to.be.a("string");

            // Get same bike after update
            const getBikeAgain = await chai
                .request(app)
                .get(`${baseRoute}/id/${ALWAYS_EXISTING_NUMBER}`);
            expect(
                getBike.body.bike.status,
                "Should be equal as the update above should fail"
            ).to.equal(getBikeAgain.body.bike.status);

            // Update bike in non existing city
            const updateBikeInNonExistingCity = await chai
                .request(app)
                .put(`${baseRoute}/id/${ALWAYS_EXISTING_NUMBER}`)
                .send(updateBikeWrongCityId);
            expect(
                updateBikeInNonExistingCity,
                "It shouldnt exist"
            ).to.have.status(404);
            expect(updateBikeInNonExistingCity.body.error).to.be.equal(
                "City doesn't exist"
            );

            // /**
            //  * Try updating City 1 with empty updates, check that it DID NOT change
            //  */
            // const getCity1 = await chai.request(app).get(`${baseRoute}/id/1`)
            // const updateExistingCityNoVal = await chai.request(app)
            //     .put(`${baseRoute}/id/1`)
            //     .send();
            // expect(updateExistingCityNoVal, "It shouldnt change anything since its empty, but it should succeed").to.have.status(200)
            // const getCity1AfterEmptyUpdate = await chai.request(app).get(`${baseRoute}/id/1`)
            // expect(getCity1.body.city.name, "Should be equal, the update was empty so city 1 should still be named 'Stockholm'")
            //     .to.be.equal(getCity1AfterEmptyUpdate.body.city.name)

            // /**
            //  * Test updating a city: bounds column with non stringified data. Should fail
            //  */
            // const updateExistingCityBrokenVal = await chai.request(app)
            // .put(`${baseRoute}/id/1`)
            // .send(updateCityBoundsNotString);
            // expect(updateExistingCityBrokenVal, "Should fail bc the provided bounds are not strings").to.have.status(500)

            const updateExistingBikeBadId = await chai
                .request(app)
                .put(`${baseRoute}/id/${ALWAYS_EXISTING_NUMBER}`)
                .send({ position: ONES });
            expect(updateExistingBikeBadId).to.have.status(400);

            /**
             * Expect to succeed
             */
            const getBikeBeforeUpdate = await chai
                .request(app)
                .get(`${baseRoute}/id/${mockBikeIdUpdate}`);
            const updateExistingBike = await chai
                .request(app)
                .put(`${baseRoute}/id/${mockBikeIdUpdate}`)
                .send(updateExistingBikeParams);
            expect(updateExistingBike).to.have.status(200);
            expect(updateExistingBike.body.message).to.equal(
                "Bike updated successfully"
            );
            const getBikeAfterUpdate = await chai
                .request(app)
                .get(`${baseRoute}/id/${mockBikeIdUpdate}`);
            expect(
                JSON.stringify(getBikeAfterUpdate),
                "Should not be equal as the bike wwas updated"
            ).to.not.equal(JSON.stringify(getBikeBeforeUpdate));
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it("GET /bikes - GET all existing bikes", async () => {
        try {
            /**
             * Expect all to succeed.
             * Retrieving all available bikes
             */
            const getBikes = await chai.request(app).get(`${baseRoute}`);
            expect(
                getBikes,
                "Should be 200 unless the server is down"
            ).to.have.status(200, "should succeed as the user exists");
            expect(getBikes.body.bike).to.not.be.empty;
            expect(
                getBikes.body.bike,
                "Should be an array of all bike objects"
            ).to.be.an("array");
            expect(getBikes.body.bike[0], "Should be a bike object").to.be.an(
                "object"
            );
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it("GET /bikes - GET a bike based on its id, if it exists", async () => {
        try {
            /**
             * Expect all to succeed.
             * Retrieving a specific bike based on its id
             */
            const getBike = await chai
                .request(app)
                .get(`${baseRoute}/id/${ALWAYS_EXISTING_NUMBER}`);
            expect(
                getBike,
                "Should be 200 unless the server is down"
            ).to.have.status(200, "should succeed as the user exists");
            expect(getBike.body.bike).to.not.be.empty;
            expect(getBike.body.bike, "Should be a bike object").to.be.an(
                "object"
            );
            expect(getBike.body.bike.id.toString(), "Should be equal").to.equal(
                ALWAYS_EXISTING_NUMBER
            );

            /**
             * Should fail. Getting a nonexisting bike id
             */
            const getNotExistingBike = await chai
                .request(app)
                .get(`${baseRoute}/id/${NEVER_EXISTING_NUMBER}`);
            expect(
                getNotExistingBike,
                `Should be 404 because bike id:${NEVER_EXISTING_NUMBER} does not exist`
            ).to.have.status(404);
            expect(getNotExistingBike.body.bike, "Should not find a bike").to.be
                .undefined;
            expect(getNotExistingBike.body.error).to.be.equal("No matching id");
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });

    // ### Hämta alla cyklar i en specifik stad via stadens namn (You can search for substrings)
    it("GET /v1/bikes/search/[name] - GET all bikes in [city name], if there are any", async () => {
        try {
            /**
             * Retrieving all bikes based on a city name
             */
            const getBikesInCityName = await chai
                .request(app)
                .get(`${baseRoute}/search/stock`);
            expect(
                getBikesInCityName,
                `Should be have minumum 2 bikes`
            ).to.have.status(200);
            expect(
                getBikesInCityName.body.bikes,
                `Should be have minumum 2 bikes`
            ).to.have.a.lengthOf.at.least(2);
            expect(
                getBikesInCityName.body.bikes[0].city.toLowerCase(),
                'Should have at least two bikes with "stock" in the name'
            ).to.include("stock");

            /**
             * Should fail. Getting a nonexisting bike id
             */
            const getNotExistingCity = await chai
                .request(app)
                .get(`${baseRoute}/search/${NEVER_EXISTING_NAME}`);
            expect(
                getNotExistingCity,
                `Should be 404 because city name: ${NEVER_EXISTING_NAME} doesnt exist`
            ).to.have.status(404);
            expect(getNotExistingCity.body.bikes, "Should find a bike").to.be
                .undefined;
            expect(getNotExistingCity.body.error).to.be.equal(
                "No matching cities"
            );

            const getBikeInCityWithNoBikes = await chai
                .request(app)
                .get(`${baseRoute}/search/göteborg`);
            console.log(
                "🚀 ~ file: bikes.test.js:384 ~ it ~ getBikeInCityWithNoBikes:",
                getBikeInCityWithNoBikes.body.bikes
            );
            expect(
                getBikeInCityWithNoBikes,
                `Should be 404 because city name: ${NEVER_EXISTING_NAME} doesnt exist`
            ).to.have.status(404);
            expect(getBikeInCityWithNoBikes.body.bikes, "Should find a bike").to
                .be.undefined;
            expect(getBikeInCityWithNoBikes.body.error).to.be.equal(
                "No bikes found"
            );
        } catch (error) {
            console.error("Error in test:", error);
            throw error; // Re-throw the error to fail the test
        }
    });

    ``;
    // DELETE /v1/bikes/id/[bike_id]
    // Required parameters: id
    it("DELETE /v1/bikes/id/[bike_id] - Remove bike", async () => {
        try {
            const removeNoneExisting = await chai
                .request(app)
                .delete(`${baseRoute}/id/${NEVER_EXISTING_NUMBER}`);
            expect(
                removeNoneExisting,
                `Should fail as there is no bike with id = ${NEVER_EXISTING_NUMBER}`
            ).to.have.status(404);
            expect(
                removeNoneExisting.body.error,
                `Should fail as there is no city with id = ${NEVER_EXISTING_NUMBER}`
            ).to.be.equal("Bike doesn't exist");

            const removed = await chai
                .request(app)
                .delete(`${baseRoute}/id/${mockBikeIdUpdate}`);
            expect(
                removed,
                `Should succeed. Bike ${mockBikeIdUpdate} exists before every test`
            ).to.have.status(200);
            expect(
                removed.body.message,
                `Should succeed as bike with id: ${mockBikeIdUpdate} is created before each test`
            ).to.equal("Bike successfully deleted");
        } catch (error) {
            // Handle errors
            console.error(error);
            throw error;
        }
    });

});
