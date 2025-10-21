const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/auth');
const User = require('../models/User');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Quick check route (optional)
router.get('/test', (req, res) => res.json({ msg: 'Auth routes working' }));

// Protected route -> get current logged-in user
router.get('/me', auth, async (req, res) => {
  try {
    // Sequelize: find by primary key
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] } // exclude password
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
