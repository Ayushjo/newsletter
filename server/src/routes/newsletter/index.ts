import express from "express"
import { signUpHandler } from "./signup"
import { sendConfirmEmail } from "./send-confirm-email"
import { confirmEmail } from "./confirm-email"
import { sendWelcomeEmail } from "../../services/mailer/resend"


export const createNewsLetterRouter = ()=>{
    const newsLetterRouter = express.Router()
    newsLetterRouter.post("/newsletter/signup",signUpHandler)
    newsLetterRouter.post("/newsletter/send-confirm-email",sendConfirmEmail)
    newsLetterRouter.post("/newsletter/confirm-email",confirmEmail)
    newsLetterRouter.post("/newsletter/welcome",sendWelcomeEmail)
    return newsLetterRouter
}