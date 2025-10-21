require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { sequelize } = require('./db');

const seedAdmin = async () => {
  try {
    await sequelize.sync(); // ensure tables exist

    const existing = await User.findOne({ where: { email: 'admin@example.com' } });
    if (existing) return console.log('Admin already exists');

    const hashed = await bcrypt.hash('admin123', 10);

    await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashed,
      role: 'admin'
    });

    console.log('✅ Admin user created');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
