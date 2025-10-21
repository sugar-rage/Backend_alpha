const Vehicle = require('../models/Vehicle');

// Register a vehicle (any logged-in user)
exports.registerVehicle = async (req, res, next) => {
  try {
    const { plateNo, type } = req.body;
    const userId = req.user.id;

    // Check if already registered
    const existing = await Vehicle.findOne({ where: { plateNo } });
    if (existing) return res.status(400).json({ msg: 'Vehicle already registered' });

    const vehicle = await Vehicle.create({ plateNo, type, userId });

    res.status(201).json({ msg: 'Vehicle registered successfully', vehicle });
  } catch (err) {
    next(err);
  }
};

// Get all vehicles (admin only)
exports.getVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.findAll({ include: ['User'] });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

// Get a vehicle by ID (admin or owner)
exports.getVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) return res.status(404).json({ msg: 'Vehicle not found' });

    // Only admin or owner can access
    if (userRole !== 'admin' && vehicle.userId !== userId) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};
