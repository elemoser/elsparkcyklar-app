const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('parked_bikes', {
    bike_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'bike',
        key: 'id'
      }
    },
    park_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'parking',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'parked_bikes',
    timestamps: false
  });
};
