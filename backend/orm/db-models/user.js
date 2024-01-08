const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    role: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "\"customer\""
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false
  });
};
