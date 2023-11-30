const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('price', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    start_fee: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 20.00
    },
    cost_per_minute: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 3.00
    },
    free_parking_fee: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 20.00
    },
    start_free_park_discount: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0.5
    }
  }, {
    sequelize,
    tableName: 'price',
    timestamps: false
  });
};
