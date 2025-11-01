const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

// Register a vehicle (logged-in user)
exports.registerVehicle = async (req, res, next) => {
  try {
    const { plateNo, type, color } = req.body;
    const userId = req.user.id;

    const existing = await Vehicle.findOne({ where: { plateNo } });
    if (existing) return res.status(400).json({ message: 'Vehicle already registered' });
    if (!plateNo || !type || !color)
      return res.status(400).json({ message: 'plateNo, type, and color required' });

    const vehicle = await Vehicle.create({ plateNo, type, color, userId });
    res.status(201).json({ message: 'Vehicle registered successfully', vehicle });
  } catch (err) {
    next(err);
  }
};

// Get all vehicles (admin only)
exports.getVehicles = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const vehicles = await Vehicle.findAll({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });

    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

// Get vehicle by ID (admin or owner)
exports.getVehicleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const vehicle = await Vehicle.findByPk(id, {
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });

    if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });

    if (req.user.role !== 'admin' && vehicle.userId !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

// Get vehicles for logged-in user
exports.getMyVehicles = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const vehicles = await Vehicle.findAll({ where: { userId } });

    res.status(200).json(vehicles);
  } catch (err) {
    next(err);
  }
};

// Delete vehicle (owner only)
exports.deleteVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const vehicle = await Vehicle.findOne({ where: { id, userId } });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found or not authorized" });
    }

    await vehicle.destroy();
    res.json({ message: "Vehicle deleted successfully" });
  } catch (err) {
    next(err);
  }
};




