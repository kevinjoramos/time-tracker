import express from "express";
import {listAllTimers, createNewTimer} from "../controllers/timers.js";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from "../utils/swagger-output.json" assert { type: "json"}
import bodyParser from "body-parser";

export const router = express.Router();

router.use(bodyParser.json())
router.use('/api-docs', swaggerUi.serve);

router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get("/timers", listAllTimers);

router.post("/timers", createNewTimer);

