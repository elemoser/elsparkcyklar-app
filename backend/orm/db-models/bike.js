const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bike', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    battery: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'city',
        key: 'id'
      }
    },
    speed: {
      type: DataTypes.REAL,
      allowNull: true,
      defaultValue: 0.00
    },
    position: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "\"available\""
    }
  }, {
    sequelize,
    tableName: 'bike',
    timestamps: false
  });
};
