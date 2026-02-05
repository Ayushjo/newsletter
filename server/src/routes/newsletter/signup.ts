import { Request, Response } from "express";
import { isEmailValid } from "../../utils/isEmailValid";
import client from "../../../prisma/client"
import { upsertSubscriber } from "../../services/newsletter"
import { publishConfirmationEmail } from "../../services/pubsub/gcp";
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

    await publishConfirmationEmail(email,newsLetterSubscriber.token)
    return res.status(200).json({ success: true,newsLetterSubscriber });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
