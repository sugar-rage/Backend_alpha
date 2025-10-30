// seedAdmin.js
require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, User } = require('./models'); // adjust if your index exports differently

(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');

    // create tables if missing
    await sequelize.sync(); // do not use force here, use the server script for force

    const adminEmail = 'admin@alpha.com';
    const existing = await User.findOne({ where: { email: adminEmail } });
    if (existing) {
      console.log('Admin already exists:', existing.email);
      process.exit(0);
    }

    const hash = await bcrypt.hash('admin123', 10);
    const newAdmin = await User.create({
      name: 'Admin',
      email: adminEmail,
      password: hash,
      contact: '9999999999',
      role: 'admin'
    });

    console.log('Admin created:', newAdmin.email);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
})();
