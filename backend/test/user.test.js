const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app-test.js"); // Replace with the path to your main app file
chai.use(chaiHttp);
const expect = chai.expect;

const baseRoute = "/v1/users";

describe("Api test suite", () => {
    const NEVER_EXISTING_SSN = "999999999999999";
    const ALWAYS_EXISTING_SSN = "2101010001";
    let userDataToAdd;
    let userDataToDelete;
    let userDataToChange;
    let userDataIsChanged;
    let failedUserDataToAdd;
    before(async () => {
        try {
            failedUserDataToAdd = {
                id: "9494949494",
                last_name: "l_name_anybody",
                phone: "666",
                mail: "test@mail.se",
                balance: 40,
                subscriber: 0,
            };
            userDataToAdd = {
                id: "9494949494",
                first_name: "f_name_somebody",
                last_name: "l_name_anybody",
                phone: "666",
                mail: "test@mail.se",
                balance: 40,
                subscriber: 0,
            };
            userDataToDelete = {
                id: "9595959595",
                first_name: "f_name_somebody_else",
                last_name: "l_name_anybody_else",
                phone: "999",
                mail: "test2@mail.se",
                role: "customer",
                balance: 30,
                subscriber: 0,
            };
            userDataToChange = {
                id: "9696969696",
                first_name: "my_name",
                last_name: "my_lastname",
                phone: "999",
                mail: "test3@mail.se",
                role: "customer",
                balance: 0,
                subscriber: 0,
            };
            userDataIsChanged = {
                first_name: "not_my_name",
                last_name: "my_lastname",
                phone: "999",
                mail: "test3@mail.se",
                role: "customer",
                balance: 1,
                subscriber: 1,
            };
            /**
             * Add the data to be removed.
             */
            await chai.request(app).post(`/v1/users`).send(userDataToDelete);
            await chai.request(app).post(`/v1/users`).send(userDataToChange);
        } catch (error) {
            console.error("Error during before hook:", error);
            throw error; // Rethrow the error to make Mocha aware of it
        }
    });

    after(async () => {
        /**
         * Remove the data that was added
         */
        await chai.request(app).delete(`/v1/users/id/${userDataToAdd.id}`);
        await chai.request(app).delete(`/v1/users/id/${userDataToChange.id}`);
    });

    it("DELETE /v1/users/id/[user_id] - Remove user that doesnt exist, should fail", (done) => {
        // First request to create the user
        chai.request(app)
            .delete(`/v1/users/id/${NEVER_EXISTING_SSN}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it("POST /v1/users - Create User with missing params. should fail", async () => {
        const resFail = await chai
            .request(app)
            .post(`/v1/users`)
            .send(failedUserDataToAdd);
        expect(resFail).to.have.status(400);
        expect(resFail.body.error).to.equal("Missing required fields");
    });

    it("GET /v1/users/id/:id - Test to retrieve non existing user based on ID", (done) => {
        chai.request(app)
            .get("/v1/users/id/pppppppppp")
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body.error).to.not.be.empty;
                done();
            });
    });


    it("GET /v1/users - Get all users", async () => {
        const res = await chai
            .request(app)
            .get(`/v1/users`)
            .send();
        expect(res).to.have.status(200);
    });

    it("GET /v1/users/history/:id - Get user history", async () => {
        const res = await chai
            .request(app)
            .get(`${baseRoute}/history/2101010001`)
            .send();
        expect(res).to.have.status(200);
    });

    it("GET /v1/users/invoice/:id - Get user invoice", async () => {
        const res = await chai
            .request(app)
            .get(`${baseRoute}/invoice/2101010001`)
            .send();
        expect(res).to.have.status(200);
    });

    it("GET /v1/users/name:name - Test to find a non existent user namne", (done) => {
        const name = "ASDASDASD";
        chai.request(app)
            .get(`/v1/users/name/${name}`)
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });

    it('Test the hello world route "/"', (done) => {
        chai.request(app)
            .get("/")
            .end((err, res) => {
                expect(res.text).to.be.a("string");
                expect(res).have.status(200);
                done();
            });
    });
});
