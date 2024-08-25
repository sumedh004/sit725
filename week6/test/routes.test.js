const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server_get') 

describe('API Routes', function() {
  it('should get schedule endpoint', function(done) {
    request(app)
      .get('/api/schedule')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should post contact endpoint', function(done) {
    request(app)
      .post('/api/contact')
      .send({ name: 'Jane Doe', email: 'jane.doe@example.com', message: 'Hi there' })
      .expect('Content-Type', /json/)
      .expect(201, done);
  });
});
