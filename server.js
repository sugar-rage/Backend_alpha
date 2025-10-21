require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sequelize, User, Vehicle, Slot, Booking } = require('./models'); // import all models

// Routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const parkingRoutes = require('./routes/parking');
const vehicleRoutes = require('./routes/vehicle');
const adminRoutes = require('./routes/admin');

const app = express();

// ===========================
// ✅ Middleware
// ===========================
app.use(cors());
app.use(express.json());

// ===========================
// ✅ Routes
// ===========================
app.use('/api/auth', authRoutes);           // Login / Admin create user
app.use('/api/slots', parkingRoutes);       // Slot routes (GET public, POST/PUT/DELETE admin)
app.use('/api/vehicles', vehicleRoutes);   // Vehicle routes (register by user, view by admin)
app.use('/api/bookings', bookingRoutes);   // Booking routes (user)
app.use('/api/admin', adminRoutes);         // Admin-only routes (catalog view, etc.)

// ===========================
// ✅ Default route
// ===========================
app.get('/', (req, res) => {
  res.json({ status: 'Alpha Backend running with MySQL', message: 'Admin/User permissions enforced' });
});

// ===========================
// ✅ Error handler
// ===========================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// ===========================
// ✅ Sync Sequelize models & start server
// ===========================
const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }) // Auto-create/update tables
  .then(() => {
    console.log('✅ Tables synced successfully');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ Sequelize sync failed:', err));
