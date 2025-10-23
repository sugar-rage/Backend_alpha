// controllers/adminController.js
const { User, Vehicle, Slot, Booking } = require('../models');

exports.getCatalog = async (req, res, next) => {
  try {
    // Fetch complete catalog with joins
    const catalog = await Booking.findAll({
      attributes: ['id', 'startTime', 'endTime', 'status', 'createdAt'],
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'contact', 'role']
        },
        {
          model: Vehicle,
          attributes: ['id', 'plateNo', 'type', 'color']   // ✅ Added color
        },
        {
          model: Slot,
          attributes: ['id', 'label', 'lotName', 'level', 'hourlyRate', 'status']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      message: 'Admin catalog fetched successfully',
      count: catalog.length,
      catalog
    });
  } catch (err) {
    console.error('Error fetching catalog:', err);
    next(err);
  }
};
