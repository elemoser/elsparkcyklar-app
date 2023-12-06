const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js'); // Replace with the path to your main app file
const City = require("../orm/model-router.js")("city");
chai.use(chaiHttp);
const expect = chai.expect;
const baseRoute = "/v1/city"

describe('Api test suite', () => {
    const NEVER_EXISTING_NUMBER = "9999999999999999"
    const ALWAYS_EXISTING_NUMBER = "1"
    const testIdForUpdate = 667
    beforeEach( async () => {
        await City.create({
            id: testIdForUpdate,
            name: "Not Calcutta",
            bounds: "[5.111111,2.222222]"
        });
    afterEach( async () => {
        await City.destroy({
            where: {
            id: 667,
            },
        });
    })
    })
    after( async () => {
        /**
        //  * Remove the data that was added
        //  */
        try {
            const destroyedRows = await City.destroy({
                where: {
                id: 666,
                },
            });
            await City.destroy({
                where: {
                id: 667,
                },
            });
            
            console.log(`${destroyedRows} row(s) deleted.`);
            
        } catch (error) {
        console.error('Error deleting city:', error);
        throw error; // Rethrow the error to handle it elsewhere, if needed
        }
    });

//     DELETE /v1/city/id/[city_id]
// ```
// Required parameters:
// ```
// id
// ```
// Result:
// ```
// status(200) 'City successfully deleted'
// ```
// Possible errors (besides from db-errors):
// ```
// status(404) 'City doesn't exist'
// ```
    it('DELETE /v1/users/id/[user_id] - Remove invoice', async () => {
        try {
            const removeNoneExisting = await chai.request(app)
            .delete(`${baseRoute}/id/${NEVER_EXISTING_NUMBER}`)
            expect(removeNoneExisting, `Should fail as there is no city with id = ${NEVER_EXISTING_NUMBER}`).to.have.status(404);
            expect(removeNoneExisting.body.error, `Should fail as there is no city with id = ${NEVER_EXISTING_NUMBER}`).to.be.equal("City doesn't exist");
            
            const removed = await chai.request(app)
            .delete(`${baseRoute}/id/${testIdForUpdate}`)
            expect(removed, `Should succeed. City id ${testIdForUpdate} should exist`).to.have.status(200);
            expect(removed.body.message, `Should succeed as city with id: ${testIdForUpdate} is created before each`).to.equal("City successfully deleted");

        } catch (error) {
            // Handle errors
            console.error(error);
            throw error;
        }
    });


    it('GET /cities - GET all invoices', async () => {
        try {
            /**
             * Expect to succeed
            */
            const getCities = await chai.request(app)
                .get(`${baseRoute}`)
                expect(getCities).to.have.status(200, "should succeed as the user exists") 
                expect(getCities.body.city).to.not.be.empty;
                expect(getCities.body.city).to.be.an("array")
                console.log(getCities.body.city);
        } catch (error) {
            console.error('Error in test:', error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it('GET /city/id/:city_id - GET a specific city with city_id', async () => {
        try {
            /**
             * Expect to succeed
            */
            const getCity = await chai.request(app)
                .get(`${baseRoute}/id/${ALWAYS_EXISTING_NUMBER}`)
                expect(getCity, `should succeed as the city 'Stockholm' ID: ${ALWAYS_EXISTING_NUMBER}  exists`).to.have.status(200) 
                expect(getCity.body.city).to.not.be.empty;
                expect(getCity.body.city).to.be.an("object")
                expect(getCity.body.city.id.toString()).to.equal("1")
            
            const getNoneExistingCity = await chai.request(app)
                .get(`${baseRoute}/id/${NEVER_EXISTING_NUMBER}`)
                expect(getNoneExistingCity, `should Fail as the city with id ${NEVER_EXISTING_NUMBER} doesnt exists`).to.have.status(404) 
            
        } catch (error) {
            console.error('Error in test:', error);
            throw error; // Re-throw the error to fail the test
        }
    });

//     POST /v1/city
    // ```
    // Required parameters:
    // ```
    // id
    // name
    // bounds
    // ```

    // Result:
    // ```
    // status(200) - 'City created successfully'
    // ```
    // Possible errors (if 'id' already exists):
    // ```
    // status(500) 'Validation error'
    // ```

    it('POST /v1/city - Creating cities', async () => {
        const mockCityId = "666"
        const newCity = {
            id: mockCityId,
            name: "Calcutta",
            bounds:"[15.2555505,58.4007357]"
        }
        const newCityBrokenBounds = {
            id: mockCityId,
            name: "Calcutta",
            bounds:[15.2555505,58.4007357]
        }
        const resFail = await chai.request(app)
            .post(`${baseRoute}`)
            .send();
        expect(resFail, "Create City with missing params. should fail").to.have.status(400);
        expect(resFail.body.error).to.equal("Missing required fields");
        
        const resFail2 = await chai.request(app)
            .post(`${baseRoute}`)
            .send({id: `${NEVER_EXISTING_NUMBER}`});
        expect(resFail2, "Create City with only id params. should fail").to.have.status(400);
        expect(resFail2.body.error).to.equal("Missing required fields");

        const resFail3 = await chai.request(app)
            .post(`${baseRoute}`)
            .send(newCityBrokenBounds);
        expect(resFail3, `Create City,sending an array (not as string) as bounds`).to.have.status(500);
        expect(resFail3.error).to.not.be.empty
        
        const resSucceed = await chai.request(app)
            .post(`${baseRoute}`)
            .send(newCity);
        expect(resSucceed, `Create City with correct values ID: ${mockCityId}`).to.have.status(200);
        expect(resSucceed.body.message).to.equal("City created successfully");

});

    it('PUT /v1/city/id/:city_id - Update a city', async () => {
        const testIdForUpdate = 667
        const updateCity = {
            name: "Some City",
            bounds: "[5.666666,2.666666]"
        }
        const updateCityBroken = {
            name: "Some City",
            bounds: [5.666666,2.666666]
        }
        try {
            /**
             * Expect to fail as it doesnt exist
             */
            const updateNonExistingCity = await chai.request(app)
                .put(`${baseRoute}/id/${NEVER_EXISTING_NUMBER}`)
                .send();
            expect(updateNonExistingCity, "It shouldnt exist").to.have.status(404)

            const updateExistingCityNoVal = await chai.request(app)
                .put(`${baseRoute}/id/1`)
                .send();
            expect(updateExistingCityNoVal, "It shouldnt change anything since its empty, but it should succeed").to.have.status(200)

            
            const updateExistingCityBrokenVal = await chai.request(app)
            .put(`${baseRoute}/id/1`)
            .send(updateCityBroken);
            expect(updateExistingCityBrokenVal, "Should fail bc the provided bounds are not strings").to.have.status(500)
            /**
             * Expect to succeed
            // */
            const updateExistingCity = await chai.request(app)
                .put(`${baseRoute}/id/${testIdForUpdate}`)
                .send(updateCity);
            expect(updateExistingCity).to.have.status(200) 
            expect(updateExistingCity.body.message).to.equal("City updated successfully") 

        } catch (error) {
            console.error('Error in test:', error);
            throw error; // Re-throw the error to fail the test
        }
    });
});
