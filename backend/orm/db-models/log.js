const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('log', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    booking_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'booking',
        key: 'id'
      }
    },
    bike_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    start_time: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    start_location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    stop_time: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    stop_location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.REAL,
      allowNull: true
    },
    timestamp: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'log',
    timestamps: false
  });
};
