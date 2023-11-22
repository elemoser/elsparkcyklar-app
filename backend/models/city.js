
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('../db/bikr.db')

const city = {
    /**
     * @description Getting all cities from sqlite db
     */
    getCity: async function getCity(req, res) {
        db.all('SELECT * FROM city', (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.json({ city: rows });
        });
    }
}

module.exports = city;