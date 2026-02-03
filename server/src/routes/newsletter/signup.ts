import { Request, Response } from "express";
import { isEmailValid } from "../../utils/isEmailValid";
export const signUpHandler = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new Error("Email is required");
    }
    if (!isEmailValid(email)) {
      throw new Error("Please enter a valid email address");
    }
    return res.status(200).json({ success: true });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
