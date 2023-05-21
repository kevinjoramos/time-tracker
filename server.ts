import express, {Request, Response, NextFunction} from 'express';
import {connectToDatabase} from "./database/connection.js";
import {router} from "./routes/router.js"

const app: express.Application = express();
const PORT = 8080;

connectToDatabase()
    .then(() => {
        app.use((request: Request, response: Response, next: NextFunction) => {
            response.setHeader('Access-Control-Allow-Origin', '*');
            response.setHeader(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept'
            );
            response.setHeader(
                'Access-Control-Allow-Methods',
                'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            );
            next();
        })

        app.use("/", router);

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });