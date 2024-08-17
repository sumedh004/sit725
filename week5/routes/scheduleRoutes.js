const express = require("express");
const { getSchedule } = require("../controllers/scheduleController");
const router = express.Router();

router.get("/schedule", getSchedule);

module.exports = router;
