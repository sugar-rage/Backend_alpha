const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

router.post('/', auth, bookingController.bookSlot);               // Book a slot
router.put('/:bookingId/cancel', auth, bookingController.cancelBooking); // Cancel booking
router.get('/me', auth, bookingController.myBookings);            // Get my bookings

module.exports = router;
