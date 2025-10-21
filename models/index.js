// models/index.js
const { sequelize } = require('../utils/db');

const User = require('./User');
const Vehicle = require('./Vehicle');
const Slot = require('./Slot');
const Booking = require('./Booking');

// ===========================
// ✅ Define Associations
// ===========================

// User -> Vehicle
User.hasMany(Vehicle, { foreignKey: 'userId' });
Vehicle.belongsTo(User, { foreignKey: 'userId' });

// User -> Booking
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

// Vehicle -> Booking
Vehicle.hasMany(Booking, { foreignKey: 'vehicleId' });
Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId' });

// Slot -> Booking
Slot.hasMany(Booking, { foreignKey: 'slotId' });
Booking.belongsTo(Slot, { foreignKey: 'slotId' });

// Export all models
module.exports = {
  sequelize,
  User,
  Vehicle,
  Slot,
  Booking
};
