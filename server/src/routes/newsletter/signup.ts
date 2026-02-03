import { Request, Response } from "express";
import { isEmailValid } from "../../utils/isEmailValid";
import client from "../../../prisma/client"
import { upsertSubscriber } from "../../services/newsletter"
export const signUpHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    if (!isEmailValid(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email is not valid" });
    }

    const newsLetterSubscriber = await upsertSubscriber(email)
    return res.status(200).json({ success: true,newsLetterSubscriber });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
