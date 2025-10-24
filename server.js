require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, User, Vehicle, Slot, Booking } = require('./models');

// Routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const parkingRoutes = require('./routes/slots');
const vehicleRoutes = require('./routes/vehicle');
const adminRoutes = require('./routes/admin');

const app = express();

// ===========================
// Middleware
// ===========================
app.use(cors());
app.use(express.json());

// ===========================
// Routes
// ===========================
app.use('/api/auth', authRoutes);
app.use('/api/slots', parkingRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// ===========================
// Default route
// ===========================
app.get('/', (req, res) => {
  res.json({ status: 'Alpha Backend running with MySQL', message: 'Admin/User permissions enforced' });
});

// ===========================
// Error handler
// ===========================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// ===========================
// Sync Sequelize models & start server
// ===========================
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log('✅ MySQL connected');

    // Sync models without dropping data, handle FK issues safely
    await sequelize.sync({ alter: true, logging: false });
    console.log('✅ Tables synced successfully');

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    // Ignore FK-drop errors
    if (err?.original?.errno === 1091) {
      console.warn('⚠️ Foreign key already exists, ignoring...');
      app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    } else {
      console.error('❌ Sequelize sync failed:', err);
      process.exit(1);
    }
  }
}

startServer();
