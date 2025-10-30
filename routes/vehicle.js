const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const vehicleController = require('../controllers/vehicleController');

// Register a vehicle (logged-in user)
router.post('/register', auth(), vehicleController.registerVehicle);

// Get all vehicles (admin only)
router.get('/', auth('admin'), vehicleController.getVehicles);

// Get vehicle by ID (admin or owner)
router.get('/:id', auth(), vehicleController.getVehicleById);

// Get all vehicles for logged-in user
router.get('/myvehicles', auth(), vehicleController.getMyVehicles);

module.exports = router;
