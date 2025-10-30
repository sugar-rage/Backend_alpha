const { User, Vehicle, Slot, Booking } = require('../models');

// Admin catalog view
exports.getCatalog = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const catalog = await Booking.findAll({
      include: [
        { model: User },
        { model: Vehicle },
        { model: Slot }
      ]
    });

    res.json(catalog);
  } catch (err) {
    console.error("Error fetching catalog:", err);
    res.status(500).json({ message: 'Error fetching catalog', error: err.message });
  }
};
