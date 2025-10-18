// routes/parking.js
const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController');

// If you want to protect creation/deletion, require auth middleware:
// const auth = require('../middleware/auth');

router.get('/slots', parkingController.getSlots);
router.get('/slots/:id', parkingController.getSlot);

// Protect these in future: router.post('/slots', auth, parkingController.addSlot);
router.post('/slots', parkingController.addSlot);

// router.put('/slots/:id', auth, parkingController.updateSlot);
router.put('/slots/:id', parkingController.updateSlot);

// router.delete('/slots/:id', auth, parkingController.deleteSlot);
router.delete('/slots/:id', parkingController.deleteSlot);

module.exports = router;
