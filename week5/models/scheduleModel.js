const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    time: String,
    event: String,
    speaker: String,
});

module.exports = mongoose.model('Schedule', scheduleSchema);
