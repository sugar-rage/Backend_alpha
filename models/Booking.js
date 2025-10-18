const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
