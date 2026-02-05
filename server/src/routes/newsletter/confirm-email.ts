import { Request, Response } from "express";
import { verifySubscriber } from "../../services/newsletter";
import { publishConfirmationEmail } from "../../services/pubsub/gcp-welcome";
export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const { token, email } = req.body;

    if (!token)
      return res
        .status(400)
        .json({ success: false, message: "Token is required" });
    const subscriber = await verifySubscriber(token, email);
    if (!subscriber) {
      return res
        .status(400)
        .json({
          success: false,
          message: "There was a problem verifying your email",
        });
    }
    await publishConfirmationEmail(email);
    return res.status(200).json({ success: true, subscriber });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
