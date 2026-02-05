import express from "express"
import { signUpHandler } from "./signup"
import { sendConfirmEmail } from "./send-confirm-email"


export const createNewsLetterRouter = ()=>{
    const newsLetterRouter = express.Router()
    newsLetterRouter.post("/newsletter/signup",signUpHandler)
    newsLetterRouter.post("/newsletter/send-confirm-email",sendConfirmEmail)
    return newsLetterRouter
}