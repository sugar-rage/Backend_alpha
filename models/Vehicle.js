const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');
const User = require('./User');

const Vehicle = sequelize.define('Vehicle', {
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
  color: {                   
    type: DataTypes.STRING,
    allowNull: true,
  },
  plateNo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  type: {
    type: DataTypes.ENUM('TwoWheeler', 'Car', 'Other'),
    defaultValue: 'Car'
  }
}, {
  timestamps: true,
  tableName: 'vehicles'
});

// ===========================
// ✅ Associations
// ===========================
Vehicle.belongsTo(User, { foreignKey: 'userId' });
module.exports = Vehicle;
