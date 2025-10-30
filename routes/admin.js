const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const adminController = require('../controllers/adminController');
const { User } = require('../models');  // ✅ Added this line

// Admin catalog view
router.get('/catalog', auth('admin'), adminController.getCatalog);

router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const newUser = await User.create({ name : username, email, password });
    res.json(newUser); // ✅ return valid JSON
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

module.exports = router;
