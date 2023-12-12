
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require("../orm/model-router.js")("user");

passport.use(new GitHubStrategy({
    clientID: 'Iv1.b8ad2e23a6d1de38',
    clientSecret: '7d8a915f5fd3ed520313ab4f48647d027b9a90b2',
    callbackURL: 'http://localhost:1338/auth/github/callback'
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({
            where: { id: profile.id }
        });

        if (!user) {
            user = await User.create({
                id: profile.id,
                first_name: profile.username,
                last_name: "hej",
                phone: "hej",
                mail: "hej",
                // Lägg till andra attribut om det behövs
            });
        }

        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;
