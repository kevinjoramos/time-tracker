import {Request, Response} from "express";
import {collections} from "../database/connection.js";
import Timer from "../models/timer.js";
import {ObjectId} from "mongodb";

export const listAllTimers = async (request: Request, response: Response) => {
    const user_id = request?.user

    response.json(user_id)

    /*try {
        const timers = (await collections.timers.find({user_id: new ObjectId(user_id)}).toArray()) as Timer[];

        response.status(201).send(timers);
    } catch (error) {
        response.status(500).send(error.message);
    }*/
}

export const createNewTimer = async (request: Request, response: Response) => {
    try {

        const newTimer = new Timer(
            new ObjectId(request.body["user_id"]),
            request.body["categoryName"],
            request.body["color"],
            0,
            0,
            false,
            null
        )

        const result = await collections.timers.insertOne(newTimer);

        result
            ? response.status(201).send(`Successfully created a new timer with id ${result.insertedId}`)
            : response.status(500).send("Failed to create a new timer.");
    } catch (error) {
        console.error(error);
        response.status(400).send(error.message);
    }
}

export const editTimer = async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedTimer: Timer = req.body as Timer;
        const query = { _id: new ObjectId(id) };

        const result = await collections.timers.updateOne(query, { $set: updatedTimer });

        result
            ? res.status(200).send(`Successfully updated timer with id ${id}`)
            : res.status(304).send(`Timer with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}

export const deleteTimer = async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.timers.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed timer with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove timer with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Timer with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}