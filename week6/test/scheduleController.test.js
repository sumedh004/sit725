const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const app = require('../server_get') // Import your Express app
const Schedule = require('../models/scheduleModel');
const { connectDB, closeDB } = require('../test/db');

describe('Schedule Controller', function() {
  before(async function() {
    await connectDB();
    await Schedule.deleteMany({});
  });

  after(async function() {
  
    await closeDB();
  });

  beforeEach(async function() {
    await Schedule.create([
      { time: '10:00', event: 'Opening Ceremony', speaker: 'Alice' },
      { time: '11:00', event: 'Keynote Speech', speaker: 'Bob' }
    ]);
  });

  it('should fetch all schedules', function(done) {
    request(app)
      .get('/api/schedule')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('statusCode', 200);
        expect(res.body.data).to.be.an('array').that.is.not.empty;
        done();
      });
  });
});
