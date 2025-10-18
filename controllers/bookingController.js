const Booking = require('../models/Booking');
const Slot = require('../models/Slot');

// Book a slot
exports.bookSlot = async (req, res, next) => {
  try {
    const { slotId, vehicleId, startTime, endTime } = req.body;
    const userId = req.user.id;

    // Check slot
    const slot = await Slot.findById(slotId);
    if (!slot || slot.status !== 'Available') {
      return res.status(409).json({ message: "Slot not available" });
    }

    // Reserve slot
    slot.status = "Reserved";
    await slot.save();

    // Create booking
    const booking = await Booking.create({
      user: userId,
      vehicle: vehicleId,
      slot: slotId,
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

    const booking = await Booking.findOne({ _id: bookingId, user: userId });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.paymentStatus = "Cancelled";
    await booking.save();

    // Free slot
    await Slot.findByIdAndUpdate(booking.slot, { status: "Available" });

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    next(err);
  }
};

// Get my bookings
exports.myBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('slot vehicle');
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
};
