import passport from "passport";
import passportGoogle from "passport-google-oauth20"
import * as dotenv from "dotenv";
import User from "../models/user.js";
import {collections} from "../database/connection.js";

const GoogleStrategy = passportGoogle.Strategy;

dotenv.config()

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

passport.use(<passport.Strategy>new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/auth/google/callback",
        passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => {

        const user = new User(
            profile.name,
            profile.emails.map(email => email.value),
            profile.id
        )

        const databaseUserDocument = await collections.users.findOne({googleId: profile.id})

        if (databaseUserDocument) {
            console.log(databaseUserDocument)
            done(null, databaseUserDocument)
        } else {
            const authenticatedUser = await collections.users.insertOne(user)
            done(null, authenticatedUser)
        }


    }
));