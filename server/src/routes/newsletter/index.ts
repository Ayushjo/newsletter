import express from "express"
import { signUpHandler } from "./signup"


export const createNewsLetterRouter = ()=>{
    const newsLetterRouter = express.Router()
    newsLetterRouter.post("/newsletter/signup",signUpHandler)

    return newsLetterRouter
}