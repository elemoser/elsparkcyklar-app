const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js'); // Replace with the path to your main app file
chai.use(chaiHttp);
const expect = chai.expect;

describe('Api test suite', () => {
    let userDataToAdd;
    let userDataToDelete;
    let userDataToChange;
    let userDataIsChanged;
    before( async () => {
        try {
            userDataToAdd = {
                id: '9494949494',
                first_name: 'f_name_somebody',
                last_name: 'l_name_anybody',
                phone: '666',
                mail: "test@mail.se",
                role: "customer",
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

    /**
     * Please note that "id" can't be updated.
        Required parameters:
        ```
        role
        first_name
        last_name
        phone
        mail
        balance
        subscriber
        ```
        Result:
        ```
        status(200) - 'User updated successfully'
        ```
        Possible errors (besides from db-errors):
        ```
        status(404) 'User doesn't exist'
        ```
     */
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
            
            const updatedUser = await chai.request(app).get(`/v1/users/id/9696969696`)
            // expect(updatedUser).
            console.log("🚀 ~ file: user.test.js:146 ~ it ~ updatedUser:", updatedUser.body)
            const updateExistingUser = await chai.request(app)
                .put(`/v1/users/id/9696969696`)
                .send(userDataIsChanged);
            console.log("🚀 ~ file: user.test.js:142 ~ it ~ userDataToChange.id:", userDataToChange.id)
            expect(updateExistingUser).to.have.status(200) 
            
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

    // it('POST /v1/users - Create User',(done) => {
    //     chai.request(app)
    //     .post(`/v1/users`)
    //     .send(userDataToAdd)
    //     .end((err, res) => {
    //         expect(res).to.have.status(200);
    //         done();
    //     })
    // });