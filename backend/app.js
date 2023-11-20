const express = require("express");
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 1338;
let db = new sqlite3.Database('/db/bikr.db');

app.get("/", (req, res) => {
    res.send('Hello World!')
})

/**
 * @description Test route for getting all users from sqlite db
 */
app.get("/user", (req, res) => {
    db.all('SELECT * FROM user', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ users: rows });
    });
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})