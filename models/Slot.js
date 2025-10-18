// models/Slot.js
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  lotName: { type: String, default: 'Main Lot' },
  label: { type: String, required: true },                     // e.g., "A1"
  status: { type: String, enum: ['Available', 'Reserved', 'Occupied'], default: 'Available' },
  level: { type: Number, default: 0 },
  hourlyRate: { type: Number, default: 20 }
}, { timestamps: true });

module.exports = mongoose.model('Slot', slotSchema);
