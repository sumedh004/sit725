const mongoose = require('mongoose');

const uri = 'mongodb+srv://s223654321:H7uDcmOy0UTjPVAl@cluster0.opevcdh.mongodb.net/testdb';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log('Connected to test database');
  } catch (err) {
    console.error('Error connecting to test database:', err);
  }
};

const closeDB = async () => {
  if (!isConnected) return;

  try {
 
    await mongoose.connection.close();
    isConnected = false;
    console.log('Disconnected from test database');
  } catch (err) {
    console.error('Error closing test database:', err);
  }
};

module.exports = { connectDB, closeDB };
