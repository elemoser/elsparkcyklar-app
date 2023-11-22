
const express = require("express");
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const port = 1338;

const users = require('./routes/users.js');
const city = require('./routes/city.js');

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/", (req, res) => {
    res.send('Hello World!')
})

app.use("/v1/users", users);
app.use("/v1/city", city);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})