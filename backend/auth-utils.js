function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("http://localhost:5173/login");
}

module.exports = isAuthenticated;
