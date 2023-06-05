import passport from "passport";
import passportGoogle from "passport-google-oauth20"
const GoogleStrategy = passportGoogle.Strategy;
import * as dotenv from "dotenv";

dotenv.config()

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://yourdomain:3000/auth/google/callback",
        passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
        /*User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });*/
        return done()
    }
));

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})