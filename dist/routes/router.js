import express from "express";
import { collections } from "../database/connection.js";
export const router = express.Router();
router.use(express.json());
router.get("/timers", async (_request, response) => {
    try {
        const timers = (await collections.timers.find({}).toArray());
        response.status(201).send(timers);
    }
    catch (error) {
        response.status(500).send(error.message);
    }
});
router.post("/timers", async (request, response) => {
    try {
        const newTimer = request.body;
        const result = await collections.timers.insertOne(newTimer);
        result
            ? response.status(201).send(`Successfully created a new timer with id ${result.insertedId}`)
            : response.status(500).send("Failed to create a new timer.");
    }
    catch (error) {
        console.error(error);
        response.status(400).send(error.message);
    }
});
//# sourceMappingURL=router.js.map