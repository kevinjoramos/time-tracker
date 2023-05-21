import express from 'express';
import {connectToDatabase} from "./database/connection.js";
import {router} from "./routes/router.js"

const app: express.Application = express();
const PORT = 8080;

connectToDatabase()
    .then(() => {
        app.use("/", router);

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });