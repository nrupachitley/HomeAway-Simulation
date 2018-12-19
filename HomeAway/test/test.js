var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

var expect = chai.expect;
var should = chai.should();

it("Should check user credentials and return status code", function (done) {
    chai.request('http://localhost:5000')
        .post('/api/setSignin/')
        .send({"values":{"Email":"TestTraveler@gmail.com","Password":"TestTraveler"},"person_type":"Traveler"})
        .end(function (err, res) {
            if (err) {
                console.log("ERROR:", err)
            }
            else {
                expect(res).to.have.status(200);
            }
            done();
        });
})

it("Queries DB for properties and returns status code", function (done) {
    chai.request('http://localhost:5000')
        .get('/api/getProperty/')
        .query({"city":"Chicago","start_date":"2018-10-16","end_date":"2018-10-18","accomodates":"2"})
        .end(function (err, res) {
            if (err) {
                console.log("ERROR:", err)
            }
            else {
                expect(res).to.have.status(200);
            }
            done();
        });
})

it("Gets owner dashboard and checks for status code", function (done) {
    chai.request('http://localhost:5000')
        .get('/api/getOwnerDashboard/')
        .query({"user_id":"5bbeeaebac4bc2941f6c21ab"})
        .end(function (err, res) {
            if (err) {
                console.log("ERROR:", err)
            }
            else {
                expect(res).to.have.status(200);
            }
            done();
        });
})

it("Checks for resquest datatype", function (done) {
    chai.request('http://localhost:5000')
        .get('/api/getProfileImg/')
        .query({"user_id":"5bbeb751682fda85384ee5c9"})
        .end(function (err, res) {
            if (err) {
                console.log("ERROR:", err)
            }
            else {
                expect(res).to.have.status(200);
                res.body.should.be.a('object')
            }
            done();
        });
})

it("Inserts new user in DB and returns inserted id", function (done) {
    chai.request('http://localhost:5000')
        .post('/api/setSignup/')
        .send({"values":{"Email":"mochatest1@gmail.com","Password":"mochatest1"},"person_type":"Traveler"})
        .end(function (err, res) {
            if (err) {
                console.log("ERROR:", err)
            }
            else {
                expect(res).to.have.status(200);
                res.body.should.have.property('id')
            }
            done();
        });
})