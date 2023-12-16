
const User = require("../orm/model-router.js")("user");
const Booking = require("../orm/model-router.js")("booking");
const Invoice = require("../orm/model-router.js")("invoice");
const { upperFirst } = require("./utils.js")
const { Op } = require("sequelize");

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
     * @description Get booking-history based on id
     *
     */
        getUserHistory: async function getUserHistory(req, res, user_id) {
            try {
                const userHistory = await Booking.findAll({
                    where: { user_id: user_id },
                });
    
                if (!userHistory) {
                    return res.status(404).json({ error: "No matching id" });
                }
    
                return res.json({ user: userHistory });
            } catch (err) {
                console.error("Error in getSpecificUser:", err);
                return res.status(500).json({ err: err.message });
            }
        },

    /**
     * @description Get invoices based on id
     *
     */
        getUserInvoices: async function getUserInvoices(req, res, user_id) {
            try {
                const userInvoice = await Invoice.findAll({
                    where: { user_id: user_id },
                });

                if (!userInvoice) {
                    return res.status(404).json({ error: "No matching id" });
                }

                return res.json({ user: userInvoice });
            } catch (err) {
                console.error("Error in getSpecificUser:", err);
                return res.status(500).json({ err: err.message });
            }
        },

    /**
 * @description Get ONE invoice based on its id for a specific user
 *
 */
    getSpecificUserInvoice: async function getSpecificUserInvoice(req, res, user_id, invoice_id) {
        try {
            const userInvoice = await Invoice.findOne({
                where: { 
                    user_id: user_id,
                    id: invoice_id
                },
            });

            if (!userInvoice) {
                return res.status(404).json({ error: "No matching id" });
            }

            return res.json({ user: userInvoice });
        } catch (err) {
            console.error("Error in getSpecificUser:", err);
            return res.status(500).json({ err: err.message });
        }
    },

    /**
     * @description Get all users whose username matches the search string
     *
     */
    getMatchingUser: async function getMatchingUser(req, res, name) {
        try {
            const matchingUsers = await User.findAll({
                where: {
                    username: {
                        [Op.like]: `%${upperFirst(name)}%`
                    }
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
                username,
                role,
                balance

            } = req.body;

            if (!id || !username) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            if (!role) {
                role = "customer";
            }

            if (role !== "customer" && role !== "admin") {
                return res.status(404).json({ error: "Role must be either 'customer' or 'admin'" });
            }

            if (!balance) {
                balance = 0;
            }

            if (isNaN(balance)) {
                return res.status(404).json({ error: "'Balance' must be a number!" });
            }

            const newUser = await User.create({
                id: parseInt(id),
                username: username,
                role: role,
                balance: parseFloat(balance)
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
                balance
            } = req.body;

            //Sätt optionella värden till nya eller ursprungliga värden
            role = role || existingUser.role;
            balance = balance || existingUser.balance;

            if (role !== "customer" && role !== "admin") {
                return res.status(404).json({ error: "Role must be either 'customer' or 'admin'" });
            }

            if (isNaN(balance)) {
                return res.status(404).json({ error: "'Balance' must be a number!" });
            }

            if (!balance) {
                balance = 0;
            }

            await existingUser.update({
                role,
                balance: parseFloat(balance)
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
