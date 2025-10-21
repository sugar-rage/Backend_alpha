const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const vehicleController = require('../controllers/vehicleController');

// Register a new vehicle (protected route)
router.post('/register', auth, vehicleController.registerVehicle);

// Get all vehicles (optional: protected)
router.get('/', vehicleController.getVehicles);

// Get vehicle by ID
router.get('/:id', vehicleController.getVehicleById);

module.exports = router;
