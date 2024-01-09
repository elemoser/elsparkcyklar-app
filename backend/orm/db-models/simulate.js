const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('simulate', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    city_id: {
      type: "",
      allowNull: true,
      references: {
        model: 'city',
        key: 'id'
      }
    },
    bike_route: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'simulate',
    timestamps: false
  });
};
