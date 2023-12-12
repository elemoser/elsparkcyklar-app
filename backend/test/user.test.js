const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js'); // Replace with the path to your main app file
chai.use(chaiHttp);
const expect = chai.expect;

describe('Api test suite', () => {
    const NEVER_EXISTING_SSN = "999999999999999"
    const ALWAYS_EXISTING_SSN = "2101010001"
    let userDataToAdd;
    let userDataToDelete;
    let userDataToChange;
    let userDataIsChanged;
    let failedUserDataToAdd;
    before( async () => {
        try {
            failedUserDataToAdd = {
                id: '9494949494',
                last_name: 'l_name_anybody',
                phone: '666',
                mail: "test@mail.se",
                balance: 40,
                subscriber: 0
            };
            userDataToAdd = {
                id: '9494949494',
                first_name: 'f_name_somebody',
                last_name: 'l_name_anybody',
                phone: '666',
                mail: "test@mail.se",
                balance: 40,
                subscriber: 0
            };
            userDataToDelete = {
                id: '9595959595',
                first_name: 'f_name_somebody_else',
                last_name: 'l_name_anybody_else',
                phone: '999',
                mail: "test2@mail.se",
                role: "customer",
                balance: 30,
                subscriber: 0
            };
            userDataToChange = {
                id: '9696969696',
                first_name: 'my_name',
                last_name: 'my_lastname',
                phone: '999',
                mail: "test3@mail.se",
                role: "customer",
                balance: 0,
                subscriber: 0
            };
            userDataIsChanged = {
                first_name: 'not_my_name',
                last_name: 'my_lastname',
                phone: '999',
                mail: "test3@mail.se",
                role: "customer",
                balance: 1,
                subscriber: 1
            };
            /**
             * Add the data to be removed.
             */
            await chai.request(app).post(`/v1/users`).send(userDataToDelete)
            await chai.request(app).post(`/v1/users`).send(userDataToChange)
        } catch (error) {
        console.error('Error during before hook:', error);
        throw error; // Rethrow the error to make Mocha aware of it
    }
    })

    after( async () => {
        /**
         * Remove the data that was added
         */
        await chai.request(app).delete(`/v1/users/id/${userDataToAdd.id}`)
        await chai.request(app).delete(`/v1/users/id/${userDataToChange.id}`)
    });
    
    
    it('DELETE /v1/users/id/[user_id] - Remove added user', (done) => {
        // First request to create the user
        chai.request(app)
        .delete(`/v1/users/id/${userDataToDelete.id}`)
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        })
    });

    it('DELETE /v1/users/id/[user_id] - Remove user that doesnt exist, should fail', (done) => {
        // First request to create the user
        chai.request(app)
        .delete(`/v1/users/id/${NEVER_EXISTING_SSN}`)
        .end((err, res) => {
            expect(res).to.have.status(404);
            done();
        })
    });

    it('POST /v1/users - Create User and check if it was created', async () => {
        try {
            const res = await chai.request(app)
                .post(`/v1/users`)
                .send(userDataToAdd);
        
            expect(res).to.have.status(200);

            const res2 = await chai.request(app)
                .get(`/v1/users/id/${userDataToAdd.id}`)

            expect(res2.text).to.be.a("string");
            expect(res2).have.status(200)
            expect(res2.body.user.first_name).equals("f_name_somebody")
        } catch (error) {
            console.error('Error in test:', error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it('POST /v1/users - Create User with missing params. should fail', async () => {
            const resFail = await chai.request(app)
                .post(`/v1/users`)
                .send(failedUserDataToAdd);
            expect(resFail).to.have.status(400);
            expect(resFail.body.error).to.equal("Missing required fields");
    });

    it('PUT /v1/users/id/:user_id - Update a users data', async () => {
        try {
            /**
             * Expect to fail
             */
            const updateNonExistingUser = await chai.request(app)
                .put(`/v1/users/id/000000000000X`)
                .send(userDataToChange);
            expect(updateNonExistingUser).to.have.status(404) 
            
            /**
             * Expect to succeed
            */
            const updateExistingUser = await chai.request(app)
                .put(`/v1/users/id/9696969696`)
                .send(userDataIsChanged);
            expect(updateExistingUser).to.have.status(200) 
            
        } catch (error) {
            console.error('Error in test:', error);
            throw error; // Re-throw the error to fail the test
        }
    });
    it('GET /history/:user_id - GET users history from booking', async () => {
        try {
            /**
             * Expect to fail as the user doesnt exist
             */
            const getNoneExistingHistory = await chai.request(app)
                .get(`/v1/users/history/${NEVER_EXISTING_SSN}`)

            expect(getNoneExistingHistory).to.have.status(404, "Expect to fail as the user doesnt exist") 
            expect(getNoneExistingHistory.body.error).to.equal("No matching id") 
            
            /**
             * Expect to succeed
            */
            const getHistory = await chai.request(app)
                .get(`/v1/users/history/${ALWAYS_EXISTING_SSN}`)
                expect(getHistory).to.have.status(200, "should succeed as the user exists") 
                expect(getHistory.body.user).to.not.be.empty;
            
        } catch (error) {
            console.error('Error in test:', error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it('GET /invoice/:user_id - GET users invoices', async () => {
        try {
            /**
             * Expect to fail as the user doesnt exist
             */
            const getNoneExistingInvoice = await chai.request(app)
                .get(`/v1/users/invoice/${NEVER_EXISTING_SSN}`)
            expect(getNoneExistingInvoice, `Expect to fail as the user: ${NEVER_EXISTING_SSN} doesnt exist`).to.have.status(404) // Ger alltid minst [] även om användaren inte finns? 
            expect(getNoneExistingInvoice.body.error).to.equal("No matching id") 
            
            /**
             * Expect to succeed
            */
            const getInvoice = await chai.request(app)
                .get(`/v1/users/invoice/${ALWAYS_EXISTING_SSN}`)
                expect(getInvoice).to.have.status(200, "should succeed as the user exists") 
                expect(getInvoice.body.user).to.not.be.empty;
            
        } catch (error) {
            console.error('Error in test:', error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it('GET /v1/users - Test to retrieve all users', (done) => {
        chai.request(app)
        .get('/v1/users')
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a("object")
            expect(res.body.users).to.be.a("array")
            expect(res.body.users[0].first_name).to.be.a("string")
            expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            expect(res.body.users).to.have.lengthOf.at.least(1);
            done();
        });
    });

    it('GET /v1/users - Test to retrieve non existing user based on ID', (done) => {
        chai.request(app)
        .get('/v1/users/id/pppppppppp')
        .end((err, res) => {
            expect(res).to.have.status(404)
            expect(res.body.error).to.not.be.empty
            done();
        });
    });

    it('GET /v1/users/name:name - Test to find a user named John (in first AND last name', (done) => {
        const nameSearch = "John"
        const nameCompare = "john"
        chai.request(app)
        .get(`/v1/users/name/${nameSearch}`)
        .end((err, res) => {
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object');
            expect(res.body.users).to.be.an('array');
            let findJohnFName = res.body.users.find(user => user.first_name.toLowerCase().includes(nameCompare))
            let findJohnLName = res.body.users.find(user => user.last_name.toLowerCase().includes(nameCompare))
            expect(findJohnFName || findJohnLName).to.not.be.empty
            done();
        });
    });

    it('GET /v1/users/name:name - Test to find a non existent user namne', (done) => {
        const name = "ASDASDASD"
        chai.request(app)
        .get(`/v1/users/name/${name}`)
        .end((err, res) => {
            expect(res).to.have.status(404)
            done();
        });
    });
    
    
    it('Test the hello world route "/"', (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            expect(res.text).to.be.a("string");
            expect(res).have.status(200)
            done();
        });
    });
});
