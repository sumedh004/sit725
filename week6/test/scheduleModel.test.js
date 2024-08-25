const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const Schedule = require('../models/scheduleModel');
const { connectDB, closeDB } = require('../test/db');

describe('Schedule Model', function() {
  before(async function() {
    await connectDB();
    await Schedule.deleteMany({});
  });

  after(async function() {
  
    await closeDB();
  });

  it('should create a schedule entry', async function() {
    const schedule = new Schedule({
      time: '12:00',
      event: 'Lunch Break',
      speaker: 'Charlie'
    });
    const savedSchedule = await schedule.save();
    expect(savedSchedule._id).to.be.a('object');
    expect(savedSchedule.time).to.equal('12:00');
    expect(savedSchedule.event).to.equal('Lunch Break');
    expect(savedSchedule.speaker).to.equal('Charlie');
  });
});
