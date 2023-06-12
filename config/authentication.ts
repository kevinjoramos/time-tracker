import passport from "passport";
import passportGoogle from "passport-google-oauth20"
const GoogleStrategy = passportGoogle.Strategy;
import * as dotenv from "dotenv";
import User from "../models/user.js";
import {collections} from "../database/connection.js";

dotenv.config()

passport.serializeUser((user: User, done) => {
    done(null, user._id)
})

passport.deserializeUser((user_id, done) => {
    done(null, user_id)
})

passport.use(<passport.Strategy>new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback",
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {

        const user = new User(
            profile.username,
            profile.emails.map(email => email.value),
            profile.id
        )

        const authenticatedUser = await collections.users.findOneAndReplace(
            {googleId: user.googleId},
            user,
            {
                upsert: true,
                returnDocument: "after"
            }
        )

        done(null, authenticatedUser)
    }
));