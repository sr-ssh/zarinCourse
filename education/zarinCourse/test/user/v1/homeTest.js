process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 user home Tests';
const baseRoute = '/api/user/v1/';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let pay;

chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        pay = appConfig.test.pay;
        done();
    })


    describe('Check get Apis', () => {

        it('check validate pay', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}?Authority=000000000000000000000000000000672220&Status=OK`)
                .send();
            res.should.have.status(200);
        });

    });

    describe('Check Post Apis', () => {

        it('check pay', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/`)
                .send(pay);
            res.should.have.status(200);
        });

    });


    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
