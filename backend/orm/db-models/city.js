const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('city', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    bounds: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    radius: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5000
    }
  }, {
    sequelize,
    tableName: 'city',
    timestamps: false
  });
};
