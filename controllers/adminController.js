// controllers/adminController.js
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Slot = require('../models/Slot');

exports.getCatalog = async (req, res, next) => {
  try {
    // Get all users
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'contact', 'role', 'createdAt'],
      include: [
        {
          model: Vehicle,
          attributes: ['id', 'plateNo', 'type', 'createdAt']
        }
      ]
    });

    // Get all slots
    const slots = await Slot.findAll({
      attributes: ['id', 'label', 'lotName', 'level', 'hourlyRate', 'status', 'createdAt']
    });

    res.json({
      users,
      slots
    });
  } catch (err) {
    next(err);
  }
};
