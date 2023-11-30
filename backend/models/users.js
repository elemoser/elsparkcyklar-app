
const User = require("../orm/model-router.js")("user");

const { Op } = require("sequelize");

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

            return res.json({ users: users });
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
            const specUser = await User.findOne({
                where: { id: user_id },
            });

            if (!specUser) {
                return res.status(404).json({ error: "No matching id" });
            }

            return res.json({ user: specUser });
        } catch (err) {
            console.error("Error in getSpecificUser:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Get all users whose first_name or last_name match the provided name
     *
     */
    getMatchingUser: async function getMatchingUser(req, res, name) {
        try {
            const matchingUsers = await User.findAll({
                where: {
                    [Op.or]: [
                        { first_name: { [Op.like]: `%${upperFirst(name)}%` } },
                        { last_name: { [Op.like]: `%${upperFirst(name)}%` } },
                    ],
                },
            });

            if (matchingUsers.length === 0) {
                return res.status(404).json({ error: "No matching names" });
            }

            return res.json({ users: matchingUsers });
        } catch (err) {
            console.error("Error in getMatchingUser:", err);
            return res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Skapa en ny användare
     *
     */
    createUser: async function createUser(req, res) {
        try {
            /* Hämta attribut från req.body */
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

            const newUser = await User.create({
                id: parseInt(id),
                role,
                first_name,
                last_name,
                phone,
                mail,
                balance: parseFloat(balance),
                subscriber: parseInt(subscriber),
            });

            res.status(200).json({ message: "User created successfully", user: newUser });
        } catch (err) {
            console.error("Error in createUser:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Uppdatera användare
     *
     */
    updateUser: async function updateUser(req, res, user_id) {
        try {
            /* Kontrollera om användaren finns via primary key (PK) */
            const existingUser = await User.findByPk(user_id);

            if (!existingUser) {
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

            if (!role || !first_name || !last_name || !mail || !phone || !balance || !subscriber) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            await existingUser.update({
                role,
                first_name,
                last_name,
                phone,
                mail,
                balance: parseFloat(balance),
                subscriber: parseInt(subscriber),
            });

            res.status(200).json({ message: "User updated successfully" });
        } catch (err) {
            console.error("Error in updateUser:", err);
            res.status(500).json({ error: err.message });
        }
    },

    /**
     * @description Radera användare
     *
     */
    deleteUser: async function deleteUser(req, res, user_id) {
        try {
            /* Kontrollera om användaren finns */
            const existingUser = await User.findByPk(user_id);

            if (!existingUser) {
                return res.status(404).json({ error: "User doesn't exist" });
            }

            await existingUser.destroy();

            res.status(200).json({ message: "User successfully deleted" });
        } catch (err) {
            console.error("Error in deleteUser:", err);
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = users;