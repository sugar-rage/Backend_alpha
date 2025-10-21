const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

// Register a new vehicle
exports.registerVehicle = async (req, res, next) => {
  try {
    const { plateNo, type } = req.body;
    const userId = req.user.id;

    if (!plateNo) return res.status(400).json({ message: 'Plate number required' });

    // Check if vehicle already exists
    const existing = await Vehicle.findOne({ where: { plateNo } });
    if (existing) return res.status(400).json({ message: 'Vehicle already registered' });

    const vehicle = await Vehicle.create({ plateNo, type, userId });
    res.status(201).json({ msg: 'Vehicle registered successfully', vehicle });
  } catch (err) {
    next(err);
  }
};

// Get all vehicles
exports.getVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.findAll({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });
    res.json({ vehicles });
  } catch (err) {
    next(err);
  }
};

// Get vehicle by ID
exports.getVehicleById = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });
    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};
