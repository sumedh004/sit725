const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const Contact = require('../models/contactModel');
const { connectDB, closeDB } = require('../test/db');

describe('Contact Model', function() {
  before(async function() {
    await connectDB();

    await Contact.deleteMany({});
  });

  after(async function() {
    
    await closeDB();
  });

  it('should create a contact entry', async function() {
    const contact = new Contact({
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      message: 'Hello'
    });
    const savedContact = await contact.save();
    expect(savedContact._id).to.be.a('object');
    expect(savedContact.name).to.equal('Jane Doe');
    expect(savedContact.email).to.equal('jane.doe@example.com');
    expect(savedContact.message).to.equal('Hello');
  });
});
