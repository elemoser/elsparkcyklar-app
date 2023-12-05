const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js'); // Replace with the path to your main app file
chai.use(chaiHttp);
const expect = chai.expect;
const baseRoute = "/v1/invoice"
describe('Api test suite', () => {
    const NEVER_EXISTING_NUMBER = "9999999999999999"
    const ALWAYS_EXISTING_NUMBER = "1"
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

    it('GET /invoice - GET all invoices', async () => {
        try {
            /**
             * Expect to succeed
            */
            const getInvoice = await chai.request(app)
                .get(`${baseRoute}`)
                expect(getInvoice).to.have.status(200, "should succeed as the user exists") 
                expect(getInvoice.body.invoice).to.not.be.empty;
                expect(getInvoice.body.invoice).to.be.an("array")
            
        } catch (error) {
            console.error('Error in test:', error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it('GET /invoice/:invoice_id - GET a specifik invoice with invoice ID', async () => {
        try {
            /**
             * Expect to succeed
            */
            const getInvoice = await chai.request(app)
                .get(`${baseRoute}/id/${ALWAYS_EXISTING_NUMBER}`)
                expect(getInvoice).to.have.status(200, "should succeed as the user exists") 
                expect(getInvoice.body.invoice).to.not.be.empty;
                expect(getInvoice.body.invoice).to.be.an("object")
                expect(getInvoice.body.invoice.id.toString()).to.equal("1")
            
            const getNoneExistingInvoice = await chai.request(app)
                .get(`${baseRoute}/id/${NEVER_EXISTING_NUMBER}`)
                expect(getNoneExistingInvoice).to.have.status(404, "should succeed as the user exists") 
            
        } catch (error) {
            console.error('Error in test:', error);
            throw error; // Re-throw the error to fail the test
        }
    });
});
