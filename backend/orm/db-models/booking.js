const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "booking",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            bike_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "bike",
                    key: "id",
                },
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "user",
                    key: "id",
                },
            },
            start_time: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            start_location: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            stop_time: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            stop_location: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: true,
                defaultValue: 0.0,
            },
        },
        {
            sequelize,
            tableName: "booking",
            timestamps: false,
        }
    );
};
