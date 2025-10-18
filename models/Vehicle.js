const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plateNo: { type: String, required: true, unique: true },
  type: { type: String, enum: ['TwoWheeler', 'Car', 'Other'], default: 'Car' }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
