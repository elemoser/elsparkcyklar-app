
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../db/bikr.db')

function upperFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const users = {
    /**
     * @description Getting all users from sqlite db
     */
    getUsers: async function getUsers(req, res) {
        db.all('SELECT * FROM user', (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.json({ users: rows });
        });
    },

    /**
     * @description Get specific user based on ID
     *
    */
    getSpecificUser: async function getSpecificUser(req, res, user_id) {
        db.get('SELECT * FROM user WHERE id = ?', [user_id], (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!row) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.json({ user: row });
        });
    },

    /**
     * @description Get all names that matches
     *
    */
    getMatchingUser: async function getMatchingUser(req, res, name) {
        db.all(
            'SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?',
            [`%${upperFirst(name)}%`, `%${upperFirst(name)}%`],
            (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (!row) {
                return res.status(404).json({ error: 'No matching names' });
            }

            return res.json({ user: row });
        });
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
            subscriber
        } = req.body;

        if (!id || !first_name || !last_name || !mail || !phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!role) {
            role = "customer"
        }

        if (!balance) {
            balance = 0.00
        }

        if (!subscriber) {
            subscriber = 0
        }

        db.run(`
        INSERT INTO user
        (id, role, first_name, last_name, phone, mail, balance, subscriber)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, role, first_name, last_name, phone, mail, balance, subscriber], (err) => {

            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(200).json({ message: 'User created successfully' });
        })
    },

    /**
     * @description Update user
     *
    */
    updateUser: async function updateUser(req, res, user_id) {
        /* Check if user exists */
        db.get('SELECT * FROM user WHERE id = ?', [user_id], (err, user) => {
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
                subscriber
            } = req.body;

            if (Object.keys(req.body).length < 8) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            db.run(`
            UPDATE user
            SET role = ?, first_name = ?,
            last_name = ?, phone = ?, mail = ?,
            balance = ?, subscriber = ?
            WHERE id = ?`,
            [
                role, first_name, last_name, phone,
                mail, balance, subscriber, user_id
            ], (err) => {

                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                res.status(200).json({ message: 'User updated successfully' });
            })
        })
    },

    /**
     * @description Delete user
     *
    */
    deleteUser: async function deleteUser(req, res, user_id) {
        /* Check if user exists */
        db.get('SELECT * FROM user WHERE id = ?', [user_id], (err, user) => {
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

                res.status(200).json({ message: 'User successfully deleted' });
            })
        })
    },
}

module.exports = users;