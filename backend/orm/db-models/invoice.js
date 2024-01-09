const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "invoice",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            log_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: "booking",
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
            total_price: {
                type: DataTypes.REAL,
                allowNull: true,
            },
            status: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: "invoice",
            timestamps: false,
        }
    );
};
