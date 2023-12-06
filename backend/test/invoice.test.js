const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js'); // Replace with the path to your main app file
const Invoice = require("../orm/model-router.js")("invoice");
chai.use(chaiHttp);
const expect = chai.expect;
const baseRoute = "/v1/invoice"

describe('Api test suite', () => {
    const NEVER_EXISTING_NUMBER = "9999999999999999"
    const ALWAYS_EXISTING_NUMBER = "1"
    before( async () => {
        //
    })

    after( async () => {
        /**
         * Remove the data that was added
         */
        const newUser = await Invoice.create({
            id: 5,
            log_id: 5,
            user_id: 2101040004,
            total_price: 18.75,
            status: "pending"
        });
    });

    it('DELETE /v1/invoice/id/[user_id] - Remove invoice', async () => {
        try {
            const removeNoneExisting = await chai.request(app)
            .delete(`${baseRoute}/id/${NEVER_EXISTING_NUMBER}`)
            expect(removeNoneExisting, `Should fail as there is no invoice with id = ${NEVER_EXISTING_NUMBER}`).to.have.status(404);
            const removed = await chai.request(app)
            .delete(`${baseRoute}/id/5`)
            expect(removed, "Should succeed. Invoice id 5 should exist").to.have.status(200);
        } catch (error) {
            // Handle errors
            console.error(error);
            throw error;
        }
    });


    it('GET /invoice - GET all invoices', async () => {
        try {
            /**
             * Expect to succeed
            */
            const getInvoice = await chai.request(app)
                .get(`${baseRoute}`)
                expect(getInvoice).to.have.status(200, "should succeed") 
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
                expect(getInvoice).to.have.status(200, "should succeed as the invoice exists") 
                expect(getInvoice.body.invoice).to.not.be.empty;
                expect(getInvoice.body.invoice).to.be.an("object")
                expect(getInvoice.body.invoice.id.toString()).to.equal("1")
            
            const getNoneExistingInvoice = await chai.request(app)
                .get(`${baseRoute}/id/${NEVER_EXISTING_NUMBER}`)
                expect(getNoneExistingInvoice).to.have.status(404, "should succeed as the Invoice exists") 
            
        } catch (error) {
            console.error('Error in test:', error);
            throw error; // Re-throw the error to fail the test
        }
    });

    it('PUT /v1/invoice/id/:invoice_id - Update a invoice', async () => {
        const invoiceUpdateData = {
            status: "payed",
            total_price: 40
        }
        const invoiceUpdateBrokenDataPriceOnly = {
            total_price: "aDS"
        }
        const invoiceUpdateBrokenDataStatusOnly = {
            status: "Not allowed stat"
        }
        try {
            /**
             * Expect to fail
             */
            const updateNonExistingInvoice = await chai.request(app)
                .put(`${baseRoute}/id/${NEVER_EXISTING_NUMBER}`)
                .send();
            expect(updateNonExistingInvoice).to.have.status(404) 
            
            /**
             * Expect to succeed
            */
            const updateExistingUser = await chai.request(app)
                .put(`${baseRoute}/id/${ALWAYS_EXISTING_NUMBER}`)
                .send(invoiceUpdateData);
            expect(updateExistingUser).to.have.status(200) 
            
            /**
             * Make an empty update
             */
            const updateNothing = await chai.request(app)
                .put(`${baseRoute}/id/${ALWAYS_EXISTING_NUMBER}`)
                .send();
            expect(updateNothing, "Should be 200 but nothing is updated").to.have.status(200) 
            
            /**
             * Make illegal status update
             */
            const updateWithBrokenData = await chai.request(app)
                .put(`${baseRoute}/id/${ALWAYS_EXISTING_NUMBER}`)
                .send(invoiceUpdateBrokenDataStatusOnly);
            expect(updateWithBrokenData, 'Expecting 401 for update with broken status data').to.have.status(400) 
            
            /**
             * Make illegal total_price update
             */
            const updateWithBrokenDataPrice = await chai.request(app)
                .put(`${baseRoute}/id/${ALWAYS_EXISTING_NUMBER}`)
                .send(invoiceUpdateBrokenDataPriceOnly);
            expect(updateWithBrokenDataPrice, 'Expecting 401 for update with broken Price data').to.have.status(400) 
            
        } catch (error) {
            console.error('Error in test:', error);
            throw error; // Re-throw the error to fail the test
        }
    });
});
