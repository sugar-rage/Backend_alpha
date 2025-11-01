// ===========================
// Load environment variables
// ===========================
require('dotenv').config();

// ===========================
// Imports
// ===========================
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Route imports
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const parkingRoutes = require('./routes/slots');
const vehicleRoutes = require('./routes/vehicle');
const adminRoutes = require('./routes/admin');

const app = express();

// ===========================
// Middleware setup
// ==========================
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://127.0.0.1:5500', // or http://localhost:5500 (VSCode Live Server)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ===========================
// Routes
// ===========================

// ✅ Use your actual route files
app.use('/api/auth', authRoutes);
app.use('/api/slots', parkingRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// ===========================
// Temporary test route (optional)
// ===========================
// If your /api/auth/login route isn’t ready yet, this helps test the frontend.
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    const token = 'mock-jwt-token';
    return res.json({ token, user: { username, role: 'admin' } });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
});

// ===========================
// Default route
// ===========================
app.get('/', (req, res) => {
  res.json({
    status: 'Alpha Backend running with MySQL',
    message: 'Admin/User permissions enforced'
  });
});

// ===========================
// Global error handler
// ===========================
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// ===========================
// Start server & sync DB
// ===========================
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    console.log('✅ Connecting to MySQL...');
    await sequelize.sync({ alter : false});
    console.log('✅ Tables synced successfully');

    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    if (err?.original?.errno === 1091) {
      console.warn('⚠️ Foreign key issue ignored...');
      app.listen(PORT, () =>
        console.log(`🚀 Server running on http://localhost:${PORT}`)
      );
    } else {
      console.error('❌ Sequelize sync failed:', err);
      process.exit(1);
    }
  }
}

startServer();
