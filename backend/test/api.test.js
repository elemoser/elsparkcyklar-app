// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../app.js'); // Replace with the path to your main app file
// chai.use(chaiHttp);
// const expect = chai.expect;

// describe('Api test suite', () => {
//     it('Test the hello world route "/"', (done) => {
//         chai.request(app)
//         .get('/')
//         .end((err, res) => {
//             expect(res.text).to.be.a("string");
//             expect(res).have.status(200)
//             done();
//         });
//     });

//     it('Tests to retrieve all users', (done) => {
//         chai.request(app)
//         .get('/v1/users')
//         .end((err, res) => {
//             expect(res).to.have.status(200)
//             expect(res.body).to.be.a("object")
//             expect(res.body.users).to.be.a("array")
//             expect(res.body.users[0].first_name).to.be.a("string")
//             expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
//             expect(res.body.users).to.have.lengthOf.at.least(1);
//             done();
//         });
//     });

//     it('Test creating a user', (done) => {
//         const userData = { // Data for the new user
//             username: 'john_doe',
//             email: 'john@example.com',
//             password: 'secure_password'
//         };
//         chai.request(app)
//         .post('/v1/users')
//         .end((err, res) => {
//             expect(res).to.have.status(200)
//             done();
//         });
//     });
// });