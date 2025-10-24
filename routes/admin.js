const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminController = require('../controllers/adminController');

// Admin catalog view
router.get('/catalog', auth('admin'), adminController.getCatalog);

module.exports = router;
