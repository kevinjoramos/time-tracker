import {NextFunction, Request, Response} from "express";
import passport from "passport";

export const authenticateUser = passport.authenticate('google', {scope: ['email', 'profile']})


export const redirectAuthentication =
    passport.authenticate('google', {
        successRedirect: "/auth/success",
        failureRedirect: "/timers"
    })


export const notifyAuthenticationFailure = async (request: Request, response: Response) => {
    response.status(400).send("Sorry... But we could not authenticate you at this time.")
}

export const verifyLoggedIn = async (request: Request, response: Response, next: NextFunction) => {
    request.user ? next() : response.sendStatus(401)
}

export const logoutUser = async (request: Request, response: Response) => {
    request.logout((error) => console.log(error) )
    //request.session.destroy()
    response.sendStatus(200)
}