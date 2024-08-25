const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../server_get'); // Ensure this points to your Express app
const mongoose = require('mongoose');
const Schedule = require('../models/scheduleModel');
const Contact = require('../models/contactModel');
const { connectDB, closeDB } = require('../test/db');

describe('Server Tests', function() {
  before(async function() {
    // Connect to the test database
    await connectDB();

    // Insert test data for /api/schedule endpoint
    await Schedule.insertMany([
      { time: '10:00 AM', event: 'Opening Ceremony', speaker: 'Alice' },
      { time: '11:00 AM', event: 'Keynote Speech', speaker: 'Bob' },
    ]);
  });

  after(async function() {
    // Clean up the test database
    
    await closeDB();
  });

  it('should respond with the index.html file', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  describe('API Endpoints', function() {
    it('should return a list of schedules', function(done) {
      request(app)
        .get('/api/schedule')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          expect(res.body).to.have.property('statusCode', 200);
          expect(res.body).to.have.property('data').that.is.an('array').with.lengthOf(3); // Check length based on inserted data
          done();
        });
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

          // Optionally, check that the contact was saved in the database
          Contact.findOne({ email: 'john.doe@example.com' })
            .then(contact => {
              expect(contact).to.exist;
              expect(contact).to.have.property('name', 'John Doe');
              expect(contact).to.have.property('message', 'Hello');
              done();
            })
            .catch(done);
        });
    });
  });
});
