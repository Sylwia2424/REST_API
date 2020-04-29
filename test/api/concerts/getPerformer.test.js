const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Concert = require('../../../models/concerts.model');


chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;


describe('GET/api/departments', () => {
    before(async () => {
    const testDepOne = new Concert({ _id: '1', performer: 'John Doe' });
    await testDepOne.save();
  
    //const testDepTwo = new Concert({ _id: '', performer: 'Concert #2' });
    //await testDepTwo.save();
    });

    /*it('/ should return all concerts', async () => {
      const res = await request(server).get('/api/concerts/performer/:1');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.length).to.not.be.null;
    });*/
  
    it('/:id should return all concert performer by performer ', async () => {
      const res = await request(server).get('/api/concerts/performer/:performer');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.not.be.null;
    });
  
    /*it('/random should return one random concert performer', async () => {
      const res = await request(server).get('/api/departments/random');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.not.be.null;
    });*/
  
    after(async () => {
      await Concert.deleteMany();
    });
  
});