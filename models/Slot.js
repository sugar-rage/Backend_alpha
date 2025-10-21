const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Slot = sequelize.define('Slot', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  lotName: {
    type: DataTypes.STRING,
    defaultValue: 'Main Lot'
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('Available', 'Reserved', 'Occupied'),
    defaultValue: 'Available'
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  hourlyRate: {
    type: DataTypes.FLOAT,
    defaultValue: 20
  }
}, {
  timestamps: true,
  tableName: 'slots'
});

module.exports = Slot;
