require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sequelize, User, Vehicle, Slot, Booking } = require('./models'); // import all models
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const parkingRoutes = require('./routes/parking');
const vehicleRoutes = require('./routes/vehicle');

const app = express();
app.use(cors());
app.use(express.json());

// ===========================
// ✅ Routes
// ===========================
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', parkingRoutes);
app.use('/api/vehicles', vehicleRoutes);

// Default route
app.get('/', (req, res) => res.send({ status: 'Alpha Backend running with MySQL' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// ===========================
// ✅ Sync Sequelize models & Start Server
// ===========================
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }) // auto-create/update tables
  .then(() => {
    console.log('✅ Tables synced successfully');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ Sequelize sync failed:', err));
