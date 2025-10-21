const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// Admin creates a user
router.post('/create-user', auth('admin'), authController.createUser);

// Login route (both admin and user)
router.post('/login', authController.login);

module.exports = router;
