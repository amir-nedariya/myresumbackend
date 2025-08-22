const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// POST /api/form/contact
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  // Basic field check
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    // Create and save new contact
    const newContact = new Contact({ name, email, message });
    const savedContact = await newContact.save();

    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
      data: savedContact,
    });
  } catch (err) {
    console.error(err);

    // Check for Mongoose validation errors
    const errors = err.errors
      ? Object.values(err.errors).map((e) => e.message)
      : null;

    res.status(400).json({
      success: false,
      message: errors ? errors.join(", ") : "Server error. Try later.",
    });
  }
});

module.exports = router;
