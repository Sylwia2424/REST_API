const chai = require('chai');
const chaiHttp = require('chai-http');
const server2 = require('../../../server.js');
const Concert = require('../../../models/concerts.model');


chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;


describe('GET/api/concerts', () => {
    before(async () => {
    const testDepOne = new Concert({ id: '1', performer: 'John_Doe', genre: 'abc', price: '11', image:'xyz', day: '1' });
    await testDepOne.save();
    const testDepTwo = new Concert({ id: '2', performer: 'Jane', genre: 'abcd', price: '12', image:'zzz', day: '2' });
    await testDepTwo.save();
    const testDepTree = new Concert({ id: '2', performer: 'Jane', genre: 'abcd', price: '12', image:'zzz', day: '2' });
    await testDepTree.save();
    });

  
    it('/:performer should return all concerts by performer ', async () => {
      const res = await request(server2).get('/api/concerts/performer/:performer');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.not.be.null;
    });

    it('/:genre should return all concerts by genre ', async () => {
      const res = await request(server2).get('/api/concerts/genre/:genre');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.not.be.null;
    });

    it('/:genre should return all concerts between min & max price ', async () => {
      const res = await request(server2).get('/api/concerts/price/:price_min/:price_max');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.not.be.null;
    });

    it('/:genre should return all concerts in day ', async () => {
      const res = await request(server2).get('/api/concerts/price/day/:day');
      expect(res.status).to.be.equal(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.not.be.null;

    });
    after(async () => {
      await Concert.deleteMany();
    });
  
});