const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');
const auth = require('../middleware/auth');         // already existing
const adminAuth = require('../middleware/adminAuth'); // new

// Public routes (anyone can view slots)
router.get('/slots', parkingController.getSlots);
router.get('/slots/:id', parkingController.getSlot);

// Admin-only routes
router.post('/slots', auth, adminAuth, parkingController.addSlot);
router.put('/slots/:id', auth, adminAuth, parkingController.updateSlot);
router.delete('/slots/:id', auth, adminAuth, parkingController.deleteSlot);

module.exports = router;
