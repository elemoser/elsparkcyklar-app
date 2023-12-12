
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(500).json({ error: "You don't have permission to be here" }); // Redirect till inloggningssidan om inte inloggad
}

module.exports = isAuthenticated;