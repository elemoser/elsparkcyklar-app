
const express = require("express");
const cors = require('cors');
const session = require('express-session');

const passport = require('./models/oauth.js');

const app = express();
const bodyParser = require('body-parser');
const port = 1338;

const users = require('./routes/users.js');
const city = require('./routes/city.js');
const bikes = require('./routes/bikes.js');
const booking = require('./routes/booking.js');
const invoice = require('./routes/invoice.js');
const price = require('./routes/price.js');
const parking = require('./routes/parking.js');
const charger = require('./routes/charger.js');

app.use(cors());
app.options('*', cors());

app.disable('x-powered-by');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(session({ secret: 'hemligt', resave: false, saveUninitialized: false }));

// Använd passport för autentisering
app.use(passport.initialize());
app.use(passport.session());

// Logga in med GitHub
app.get('/login', passport.authenticate('github'));

// GitHub callback efter autentisering
app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
    // Vid framgångsrik autentisering, omdirigera användaren eller utför ytterligare åtgärder
        res.redirect('http://localhost:5173');
    }
);

app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('http://localhost:5173/login');
    });
});


app.get("/", (req, res) => {
    res.send('Hello World!')
});

app.use("/v1/users", users);
app.use("/v1/city", city);
app.use("/v1/bikes", bikes);
app.use("/v1/booking", booking);
app.use("/v1/invoice", invoice);
app.use("/v1/price", price);
app.use("/v1/parking", parking);
app.use("/v1/charger", charger);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

module.exports = app;