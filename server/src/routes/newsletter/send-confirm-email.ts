import { Request, Response } from "express";
import { sendConfirmationEmail } from "../../services/mailer/resend";

export const sendConfirmEmail = async (req: Request, res: Response) => {
  try {
    console.log(
      "🚀 ~ file: send-confirm-email.ts:6 ~ sendConfirmEmail ~ req.body:"
    );

    const { body } = req;
    console.log(body);

    if (!body) {
      console.log("No body");

      return res
        .status(400)
        .json({ success: false, message: "Body is required" });
    }

    const {
      message: { data: encodedJsonObject },
    } = body;
    const parsedBuffer = Buffer.from(encodedJsonObject, "base64").toString(
      "ascii"
    );
    const parsedPayLoad = JSON.parse(parsedBuffer);
    console.log(parsedPayLoad);
    await sendConfirmationEmail(parsedPayLoad.email, parsedPayLoad.token);
    console.log("email sent successfully");
    return res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
