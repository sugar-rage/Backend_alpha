const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/adminOnly');
const slotController = require('../controllers/slotController');

// Admin: Create new slot
router.post('/', auth, adminOnly, slotController.createSlot);

// Admin: Update slot
router.put('/:id', auth, adminOnly, slotController.updateSlot);

// Admin: Delete slot
router.delete('/:id', auth, adminOnly, slotController.deleteSlot);

// Everyone: View slots
router.get('/', slotController.getAllSlots);

module.exports = router;
