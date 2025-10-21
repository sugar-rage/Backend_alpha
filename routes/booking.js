const express = require('express');
const router = express.Router();
const { auth, authorizeRoles } = require('../middleware/auth');
const bookingController = require('../controllers/bookingController');

// User routes
router.post('/', auth, bookingController.bookSlot);               // Book a slot
router.put('/:bookingId/cancel', auth, bookingController.cancelBooking); // Cancel booking
router.get('/me', auth, bookingController.myBookings);            // Get my bookings

// Admin route to get all bookings
router.get('/all', auth, authorizeRoles('admin'), bookingController.allBookings);

module.exports = router;
