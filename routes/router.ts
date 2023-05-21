import express from "express";
import {listAllTimers, createNewTimer} from "../controllers/timers.js";
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from "../utils/swagger-output.json" assert { type: "json"}


export const router = express.Router();

router.use(express.json())
router.use('/api-docs', swaggerUi.serve);

router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get("/timers", listAllTimers);

router.post("/timers", createNewTimer);

