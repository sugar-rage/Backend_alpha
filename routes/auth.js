const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { auth, authorizeRoles } = require('../middleware/auth');

// Public routes
router.post('/register', register); // anyone can register as user
router.post('/login', login);

// Protected route -> get current logged-in user
router.get('/me', auth, async (req, res) => {
  try {
    const User = require('../models/User');
    const user = await User.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Example: Admin creates another user with role
router.post('/admin/create-user', auth, authorizeRoles('admin'), register);

module.exports = router;
