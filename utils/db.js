// utils/db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.MYSQL_DB,       // Database name
  process.env.MYSQL_USER,     // Username
  process.env.MYSQL_PASSWORD, // Password
  {
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,           // Set true to see SQL queries in console
  }
);

// Test connection (optional)
sequelize.authenticate()
  .then(() => console.log('✅ MySQL connected'))
  .catch(err => console.error('❌ MySQL connection failed:', err));

module.exports = { sequelize };
