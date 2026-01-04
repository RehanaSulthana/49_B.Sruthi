const express = require("express");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/analyze", auth, (req, res) => {
  const { painLevel } = req.body;

  if (painLevel >= 8) {
    return res.json({
      severity: "High",
      remedy: "Hot compress, hydration",
      action: "Doctor Appointment Required"
    });
  }

  res.json({
    severity: "Low",
    remedy: "Home remedies",
    action: "Medication Reminder"
  });
});

module.exports = router;
