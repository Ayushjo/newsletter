import { Request, Response } from "express";

export const sendConfirmEmail = async (req: Request, res: Response) => {
  try {
    const { body } = req.body;
    if (!body) {
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
    return res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
