const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

// User routes
router.post('/', auth(), bookingController.bookSlot);                  // Book a slot
router.put('/:bookingId/cancel', auth(), bookingController.cancelBooking); // Cancel booking
router.get('/my', auth(), bookingController.myBookings);              // My bookings

// Admin route: get all bookings
router.get('/all', auth('admin'), bookingController.allBookings);

module.exports = router;
