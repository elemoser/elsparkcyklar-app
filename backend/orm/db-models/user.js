const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    role: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "\"customer\""
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0.00
    },
    subscriber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false
  });
};
