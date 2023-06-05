import express from "express";
import {listAllTimers, createNewTimer, editTimer, deleteTimer} from "../controllers/timers.js";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from "../utils/swagger-output.json" assert { type: "json"}
import {
    createTimerSchema,
    deleteTimerSchema,
    getTimerSchema,
    updateTimerSchema,
    validateTimer
} from "../validation/validation.js";
import bodyParser from "body-parser";
import passport from "passport";

export const router = express.Router();

router.use(bodyParser.json())
router.use('/api-docs', swaggerUi.serve);

router.get("/auth/google", passport.authenticate('google', {scope: ['email', 'profile']}))

router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get("/timers", validateTimer(getTimerSchema), listAllTimers);

router.post("/timer", validateTimer(createTimerSchema), createNewTimer);

router.put("/timer/:id", validateTimer(updateTimerSchema) , editTimer);

router.delete("/timer/:id", validateTimer(deleteTimerSchema), deleteTimer)