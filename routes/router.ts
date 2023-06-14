import express from "express";
import {listAllTimers, createNewTimer, editTimer, deleteTimer} from "../controllers/timers.js";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from "../utils/swagger-output.json" assert { type: "json"}
import {
    createTimerSchema, deleteTimerSchema,
    updateTimerSchema,
    validateTimer
} from "../validation/validation.js";
import bodyParser from "body-parser";
import {authenticateUser, logoutUser, redirectAuthentication, verifyLoggedIn} from "../controllers/authentication.js";


export const router = express.Router();

router.use(bodyParser.json())
router.use('/api-docs', swaggerUi.serve);

router.get("/auth/google", authenticateUser)

router.get("/auth/google/callback", redirectAuthentication)

router.get("/auth/logout", logoutUser)

router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.get("/timers", verifyLoggedIn, listAllTimers);

router.post("/new-timer", verifyLoggedIn, validateTimer(createTimerSchema), createNewTimer);

router.put("/timer/:id", verifyLoggedIn, validateTimer(updateTimerSchema) , editTimer);

router.delete("/timer/:id", verifyLoggedIn, validateTimer(deleteTimerSchema), deleteTimer)