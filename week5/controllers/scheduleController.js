const Schedule = require("../models/scheduleModel");

exports.getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find({});
    res.status(200).json({ statusCode: 200, data: schedule });
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, message: "Error fetching schedule" });
  }
};
