const sqlite3 = require("sqlite3").verbose(); // Detta kan tas bort efter allt är övesatt till sequelize, behövs endast för "manuella querys."
const db = new sqlite3.Database("../db/bikr.db"); // Detta kan tas bort efter allt är övesatt till sequelize, behövs endast för "manuella querys.

const User = require("../orm/model-router.js")("user"); // Import user db-model

function upperFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const users = {
    /**
     * @description Getting all users from sqlite db
     */
    getUsers: async function getUsers(req, res) {
        try {
            const users = await User.findAll();

            return res.json(users);
        } catch (err) {
            console.error("Error in getUsers:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Get specific user based on ID
     *
     */
    getSpecificUser: async function getSpecificUser(req, res, user_id) {
        try {
            const users = await User.findOne({
                where: { id: user_id },
            });
            return res.json(users);
        } catch (err) {
            console.error("Error in getSpecificUser:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Get all names that matches
     *
     */
    getMatchingUser: async function getMatchingUser(req, res, name) {
        db.all(
            "SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?",
            [`%${upperFirst(name)}%`, `%${upperFirst(name)}%`],
            (err, row) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                if (!row) {
                    return res.status(404).json({ error: "No matching names" });
                }

                return res.json({ user: row });
            }
        );
    },

    /**
     * @description Create new user
     *
     */
    createUser: async function createUser(req, res) {
        /* Get attributes from req.body */
        let {
            id,
            role,
            first_name,
            last_name,
            phone,
            mail,
            balance,
            subscriber,
        } = req.body;

        if (!id || !first_name || !last_name || !mail || !phone) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        if (!role) {
            role = "customer";
        }

        if (!balance) {
            balance = 0.0;
        }

        if (!subscriber) {
            subscriber = 0;
        }

        db.run(
            `
        INSERT INTO user
        (id, role, first_name, last_name, phone, mail, balance, subscriber)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, role, first_name, last_name, phone, mail, balance, subscriber],
            (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.status(200).json({ message: "User created successfully" });
            }
        );
    },

    /**
     * @description Update user
     *
     */
    updateUser: async function updateUser(req, res, user_id) {
        /* Check if user exists */
        db.get("SELECT * FROM user WHERE id = ?", [user_id], (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!user) {
                return res.status(404).json({ error: "User doesn't exist" });
            }

            let {
                role,
                first_name,
                last_name,
                phone,
                mail,
                balance,
                subscriber,
            } = req.body;

            if (Object.keys(req.body).length < 8) {
                return res
                    .status(400)
                    .json({ error: "Missing required fields" });
            }

            db.run(
                `
            UPDATE user
            SET role = ?, first_name = ?,
            last_name = ?, phone = ?, mail = ?,
            balance = ?, subscriber = ?
            WHERE id = ?`,
                [
                    role,
                    first_name,
                    last_name,
                    phone,
                    mail,
                    balance,
                    subscriber,
                    user_id,
                ],
                (err) => {
                    if (err) {
                        return res.status(500).json({ error: err.message });
                    }

                    res.status(200).json({
                        message: "User updated successfully",
                    });
                }
            );
        });
    },

    /**
     * @description Delete user
     *
     */
    deleteUser: async function deleteUser(req, res, user_id) {
        /* Check if user exists */
        db.get("SELECT * FROM user WHERE id = ?", [user_id], (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!user) {
                return res.status(404).json({ error: "User doesn't exist" });
            }

            db.run(`DELETE FROM user WHERE id = ?`, [user_id], (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.status(200).json({ message: "User successfully deleted" });
            });
        });
    },
};

module.exports = users;
