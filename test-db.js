require('dotenv').config();          // load .env variables
const { sequelize } = require('./utils/db');

sequelize.authenticate()
  .then(() => console.log('✅ MySQL connected'))
  .catch(err => console.error('❌ MySQL connection failed:', err));
