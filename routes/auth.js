const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

// Admin-only: create a new user
router.post('/create-user', auth('admin'), authController.createUser);

// Login (any user or admin)
router.post('/login', authController.login);

module.exports = router;
