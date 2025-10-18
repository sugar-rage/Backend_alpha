require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ DB Connection Failed:", err));

const authRoutes = require('./routes/auth');    

app.use('/api/auth', authRoutes);

const parkingRoutes = require('./routes/parking');

app.use('/api', parkingRoutes);

const bookingRoutes = require('./routes/booking');

app.use('/api/bookings', bookingRoutes);

const vehicleRoutes = require("./routes/vehicle");

app.use("/api/vehicles", vehicleRoutes);

app.get('/', (req, res) => res.send({ status: 'Alpha Backend running' }));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
