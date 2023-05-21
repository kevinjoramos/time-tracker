import {Request, Response} from "express";
import {collections} from "../database/connection.js";
import Timer from "../models/timer.js";

export const listAllTimers = async (_request: Request, response: Response) => {
    try {
        const timers = (await collections.timers.find({}).toArray()) as Timer[];

        response.status(201).send(timers);
    } catch (error) {
        response.status(500).send(error.message);
    }
}

export const createNewTimer = async (request: Request, response: Response) => {
    try {
        const newTimer= request.body as Timer;
        const result = await collections.timers.insertOne(newTimer);

        result
            ? response.status(201).send(`Successfully created a new timer with id ${result.insertedId}`)
            : response.status(500).send("Failed to create a new timer.");
    } catch (error) {
        console.error(error);
        response.status(400).send(error.message);
    }
}