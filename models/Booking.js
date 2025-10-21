const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const User = require('./User');
const Vehicle = require('./Vehicle');
const Slot = require('./Slot');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  vehicleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Vehicle,
      key: 'id'
    }
  },
  slotId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Slot,
      key: 'id'
    }
  },
  startTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true
  },
  paymentStatus: {
    type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
    defaultValue: 'Pending'
  }
}, {
  timestamps: true,
  tableName: 'bookings'
});

// ===========================
// ✅ Associations
// ===========================
Booking.belongsTo(User, { foreignKey: 'userId' });
Booking.belongsTo(Vehicle, { foreignKey: 'vehicleId' });
Booking.belongsTo(Slot, { foreignKey: 'slotId' });

module.exports = Booking;
