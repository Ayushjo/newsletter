import { randomBytes } from "crypto";

export const createRandomToken = () => {
  return randomBytes(64).toString("hex");
};
