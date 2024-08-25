const Contact = require("../models/contactModel");

exports.submitContactForm = async (req, res) => {
  try {
    await Contact.create(req.body);
    res
      .status(201)
      .json({
        statusCode: 201,
        message: "Contact form submitted successfully.",
      });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "Error saving contact" });
  }
};
