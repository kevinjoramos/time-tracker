import express from "express";
import {listAllTimers, createNewTimer} from "../controllers/timers.js";

export const router = express.Router();

router.use(express.json())

router.get("/timers", listAllTimers);

router.post("/timers", createNewTimer);

