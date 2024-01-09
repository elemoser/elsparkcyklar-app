require("dotenv").config();
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require("../orm/model-router.js")("user");

const admins = ["elemoser", "Ylih", "mosbth"];

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:1338/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({
                    where: { id: profile.id },
                });

                if (!user) {
                    // Check if the username is in the admins array
                    const isAdmin = admins.includes(profile.username);

                    user = await User.create({
                        id: profile.id,
                        username: profile.username,
                        role: isAdmin ? "admin" : "customer",
                        balance: 0,
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

module.exports = passport;
