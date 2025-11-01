const Booking = require('../models/Booking');
const Slot = require('../models/Slot');
const Vehicle = require('../models/Vehicle');

// Book a slot
exports.bookSlot = async (req, res, next) => {
  try {
    const { slotId, vehicleId, startTime, endTime } = req.body;
    const userId = req.user.id;

    const slot = await Slot.findByPk(slotId);
    if (!slot || slot.status !== 'Available') {
      return res.status(409).json({ message: "Slot not available" });
    }

    await slot.update({ status: 'Reserved' });

    const booking = await Booking.create({
      userId,
      vehicleId,
      slotId,
      startTime,
      endTime,
      status: 'Booked'
    });

    res.status(201).json({ message: 'Slot booked successfully', booking });
  } catch (err) {
    next(err);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findOne({ where: { id: bookingId, userId } });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await booking.update({ paymentStatus: 'Cancelled' }); // 👈 Update to Cancelled

    const slot = await Slot.findByPk(booking.slotId);
    if (slot) await slot.update({ status: 'Available' }); // 👈 Free the slot

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    next(err);
  }
};

// Get my bookings
exports.myBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll({
      where: {
        userId: req.user.id
        //paymentStatus: { [require('sequelize').Op.ne]: 'Cancelled' } // 👈 exclude cancelled
      },
      include: [
        { model: Slot, attributes: ['id', 'label', 'lotName', 'status', 'hourlyRate'] },
        { model: Vehicle, attributes: ['id', 'plateNo', 'type', 'color'] }
      ],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json({ bookings });
  } catch (err) {
    console.error("Error fetching my bookings:", err);
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
};


// Admin: Get all bookings
exports.allBookings = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const bookings = await Booking.findAll({
      include: [
        { model: Slot },
        { model: Vehicle },
        { model: require('../models/User'), attributes: ['id', 'name', 'email'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({ count: bookings.length, bookings });
  } catch (err) {
    next(err);
  }
};
