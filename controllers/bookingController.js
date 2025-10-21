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

// Get all bookings (admin only)
exports.allBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: Slot },
        { model: Vehicle },
        { model: User, attributes: ['id', 'name', 'email', 'role'] }
      ]
    });
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
};


// Cancel booking (user can cancel own, admin can cancel any)
exports.cancelBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;
    const role = req.user.role;

    const booking = await Booking.findByPk(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only owner or admin can cancel
    if (booking.userId !== userId && role !== 'admin') {
      return res.status(403).json({ message: "Forbidden: Cannot cancel this booking" });
    }

    await booking.update({ paymentStatus: 'Cancelled' });

    // Free slot
    const slot = await Slot.findByPk(booking.slotId);
    if (slot) await slot.update({ status: 'Available' });

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    next(err);
  }
};

// Get bookings (admin sees all, user sees own)
exports.myBookings = async (req, res, next) => {
  try {
    let whereCondition = {};

    if (req.user.role !== 'admin') {
      whereCondition.userId = req.user.id;
    }

    const bookings = await Booking.findAll({
      where: whereCondition,
      include: [
        { model: Slot },
        { model: Vehicle },
        { model: User, attributes: ['id', 'name', 'email', 'role'] } // optional
      ]
    });

    res.json({ bookings });
  } catch (err) {
    next(err);
  }
};
