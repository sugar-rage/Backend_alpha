// controllers/parkingController.js
const Slot = require('../models/Slot');
const Booking = require('../models/Booking'); // if you created Booking model earlier
const mongoose = require('mongoose');

// GET /api/slots
exports.getSlots = async (req, res, next) => {
  try {
    const slots = await Slot.find().lean();
    res.json({ slots });
  } catch (err) {
    next(err);
  }
};

// GET /api/slots/:id
exports.getSlot = async (req, res, next) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    res.json(slot);
  } catch (err) {
    next(err);
  }
};

// POST /api/slots  (create new slot)
exports.addSlot = async (req, res, next) => {
  try {
    const { label, lotName, level, hourlyRate } = req.body;
    if (!label) return res.status(400).json({ message: 'label required' });

    const exists = await Slot.findOne({ label });
    if (exists) return res.status(400).json({ message: 'Slot with this label already exists' });

    const slot = await Slot.create({ label, lotName, level, hourlyRate });
    res.status(201).json(slot);
  } catch (err) {
    next(err);
  }
};

// PUT /api/slots/:id  (update slot)
exports.updateSlot = async (req, res, next) => {
  try {
    const updated = await Slot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Slot not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/slots/:id
exports.deleteSlot = async (req, res, next) => {
  try {
    const deleted = await Slot.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Slot not found' });
    res.json({ message: 'Slot deleted' });
  } catch (err) {
    next(err);
  }
};
