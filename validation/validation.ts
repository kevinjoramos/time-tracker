import Joi from "joi";
import {Request, Response, NextFunction} from "express";

const hexColorRegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

export const createTimerSchema = Joi.object({
    categoryName: Joi
        .string()
        .min(1)
        .max(30)
        .required(),
    color: Joi
        .string()
        .pattern(hexColorRegExp)
        .required(),
})

export const updateTimerSchema = Joi.object({
    categoryName: Joi
        .string()
        .min(1)
        .max(30),
    color: Joi
        .string()
        .pattern(hexColorRegExp),
    hoursLogged: Joi
        .number()
        .min(0),
    minutesLogged: Joi
        .number()
        .min(0)
        .max(59),
    isRunning: Joi
        .bool(),
    lastToggled: Joi
        .date()
        .iso()
})

export const deleteTimerSchema = Joi.object({
    id: Joi
        .string()
        .required(),
})



export const validateTimer = (schema: Joi.ObjectSchema) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const { error, value } = schema.validate(request.body, { abortEarly: false })

        if (!(error == null)) {
            console.log(error)
            response.status(422).send(error.message);
            return
        }

        next()
    }
}