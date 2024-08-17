const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    time: { type: String, required: true },
    event: { type: String, required: true },
    speaker: { type: String, required: true }
}, { collection: 'Schedule' });

module.exports = mongoose.model('Schedule', scheduleSchema);
