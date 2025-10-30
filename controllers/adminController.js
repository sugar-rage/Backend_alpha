// controllers/adminController.js
const { User, Vehicle, Slot, Booking } = require('../models');

exports.getCatalog = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email', 'contact', 'role'] },
        { model: Vehicle, attributes: ['id', 'plateNo', 'type', 'color'] },
        { model: Slot, attributes: ['id', 'label', 'lotName', 'level', 'hourlyRate', 'status'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    // Flatten the data for frontend
    const catalog = bookings.map(b => ({
      bookingId: b.id,
      userName: b.User?.name || 'N/A',
      userEmail: b.User?.email || 'N/A',
      contact: b.User?.contact || 'N/A',
      role: b.User?.role || 'N/A',

      plateNo: b.Vehicle?.plateNo || 'N/A',
      vehicleType: b.Vehicle?.type || 'N/A',
      color: b.Vehicle?.color || 'N/A',

      slotLabel: b.Slot?.label || 'N/A',
      lotName: b.Slot?.lotName || 'N/A',
      level: b.Slot?.level || 0,
      rate: b.Slot?.hourlyRate || 0,
      slotStatus: b.Slot?.status || 'N/A',

      startTime: b.startTime,
      endTime: b.endTime,
      createdAt: b.createdAt
    }));

    res.json({
      message: 'Catalog fetched successfully',
      count: catalog.length,
      catalog
    });
  } catch (err) {
    console.error('Error in getCatalog:', err);
    next(err);
  }
};
