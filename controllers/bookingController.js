const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

// Book a slot
exports.bookSlot = async (req, res, next) => {
  try {
    const { slotId, vehicleId, startTime, endTime } = req.body;
    const userId = req.user.id;

    // Check slot
    const slot = await Slot.findByPk(slotId);
    if (!slot || slot.status !== 'Available') {
      return res.status(409).json({ message: "Slot not available" });
    }

    // Reserve slot
    await slot.update({ status: 'Reserved' });

    // Create booking
    const booking = await Booking.create({
      userId,
      vehicleId,
      slotId,
      startTime,
      endTime
    });

    res.status(201).json({ booking });
  } catch (err) {
    next(err);
  }
};

// Cancel booking
exports.cancelBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOne({
      where: { id: bookingId, userId }
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await booking.update({ paymentStatus: 'Cancelled' });

    // Free slot
    const slot = await Slot.findByPk(booking.slotId);
    if (slot) await slot.update({ status: 'Available' });

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    next(err);
  }
};

// Get my bookings
exports.myBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.user.id },
      include: [
        { model: Slot },
        { model: Vehicle }
      ]
    });
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
};
