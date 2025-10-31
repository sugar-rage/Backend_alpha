const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');
const adminController = require('../controllers/adminController');
const authController = require('../controllers/authController');
const { User } = require('../models');  // ✅ Added this line

// Admin catalog view
router.get('/catalog', auth('admin'), adminController.getCatalog);

router.post('/users', auth('admin'),authController.register);

module.exports = router;
