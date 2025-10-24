const { User, Vehicle, Slot, Booking } = require('../models');

// Admin catalog view
exports.getCatalog = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const catalog = await Booking.findAll({
      attributes: ['id', 'startTime', 'endTime', 'status', 'createdAt'],
      include: [
        { model: User, attributes: ['id', 'name', 'email', 'contact', 'role'] },
        { model: Vehicle, attributes: ['id', 'plateNo', 'type', 'color'] },
        { model: Slot, attributes: ['id', 'label', 'lotName', 'level', 'hourlyRate', 'status'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({ message: 'Admin catalog fetched successfully', count: catalog.length, catalog });
  } catch (err) {
    next(err);
  }
};
