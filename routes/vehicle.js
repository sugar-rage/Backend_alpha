const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicle");

// Register a new vehicle
router.post("/register", async (req, res) => {
  try {
    const { plateNumber, type, color } = req.body;

    // Check if already exists
    const existing = await Vehicle.findOne({ plateNumber });
    if (existing) return res.status(400).json({ msg: "Vehicle already registered" });

    const vehicle = new Vehicle({ plateNumber, type, color });
    await vehicle.save();

    res.json({ msg: "Vehicle registered successfully", vehicleId: vehicle._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
