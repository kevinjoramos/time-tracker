import express, {Request, Response, NextFunction} from 'express';
import {connectToDatabase} from "./database/connection.js";
import {router} from "./routes/router.js";
import "./config/authentication.js"
import session from "express-session"
import passport from "passport";
import cors from "cors"
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser"

dotenv.config()
const app: express.Application = express();
const PORT = 8080;

connectToDatabase()
    .then(() => {
        app.use(cors({origin: `http://localhost:${PORT}`, credentials: true}))
        app.use(cookieParser())
        app.use(
            session({
                secret: process.env.SECRET_SESSION_CODE,
                resave: true,
                saveUninitialized: true
            })
        )
        app.use(passport.initialize())
        app.use(passport.session())
        app.use("/", router);
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });