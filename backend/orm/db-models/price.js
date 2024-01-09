const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "price",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: true,
                primaryKey: true,
            },
            start_fee: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: 20.0,
            },
            cost_per_minute: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: 3.0,
            },
            cost_per_minute_if_parking: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: 2.0,
            },
        },
        {
            sequelize,
            tableName: "price",
            timestamps: false,
        }
    );
};
