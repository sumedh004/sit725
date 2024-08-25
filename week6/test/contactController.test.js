const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const app = require('../server_get'); // Import your Express app
const Contact = require('../models/contactModel');
const { connectDB, closeDB } = require('../test/db');

describe('Contact Controller', function() {
  before(async function() {
    await connectDB();

  await Contact.deleteMany({});
});


  after(async function() {

    await closeDB();
  });

  it('should submit a contact form', function(done) {
    request(app)
      .post('/api/contact')
      .send({ name: 'John Doe', email: 'john.doe@example.com', message: 'Hello' })
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('statusCode', 201);
        expect(res.body).to.have.property('message', 'Contact form submitted successfully.');
        done();
      });
  });
});
