const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.get('/catalog', auth('admin'), adminController.getAllUsersWithVehicles);

module.exports = router;
