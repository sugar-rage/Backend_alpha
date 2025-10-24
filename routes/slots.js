const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const parkingController = require('../controllers/parkingController');

// Public routes: anyone can view
router.get('/', parkingController.getSlots);
router.get('/:id', parkingController.getSlot);

// Admin-only routes
router.post('/', auth('admin'), parkingController.addSlot);
router.put('/:id', auth('admin'), parkingController.updateSlot);
router.delete('/:id', auth('admin'), parkingController.deleteSlot);

module.exports = router;
