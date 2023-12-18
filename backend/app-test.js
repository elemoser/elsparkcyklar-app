const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");
const port = 1338;

const users = require('./routes/users.js');
const city = require('./routes/city.js');
const bikes = require('./routes/bikes.js');
const booking = require('./routes/booking.js');
const invoice = require('./routes/invoice.js');
const price = require('./routes/price.js');
const parking = require('./routes/parking.js');
const charger = require('./routes/charger.js');
const simulate = require('./routes/simulate.js');

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.options("*", cors());

app.disable("x-powered-by");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.use("/v1/users", users);
app.use("/v1/city", city);
app.use("/v1/bikes", bikes);
app.use("/v1/booking", booking);
app.use("/v1/invoice", invoice);
app.use("/v1/price", price);
app.use("/v1/parking", parking);
app.use("/v1/charger", charger);
app.use("/v1/simulate", simulate)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = app;
