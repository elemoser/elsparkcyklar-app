const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "bike",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: true,
                primaryKey: true,
            },
            battery: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            city_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "city",
                    key: "id",
                },
            },
            speed: {
                type: DataTypes.REAL,
                allowNull: true,
                defaultValue: 0.0,
            },
            position: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            state: {
                type: DataTypes.TEXT,
                allowNull: true,
                defaultValue: '"available"',
            },
            low_battery: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: "bike",
            timestamps: false,
        }
    );
};
