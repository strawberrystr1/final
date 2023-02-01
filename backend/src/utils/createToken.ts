import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/hash";

export const createToken = (name: string, email: string, role: string) => {
  return jwt.sign({ name, email, role }, process.env.JWT_SECRET || JWT_SECRET, {
    expiresIn: "10s"
  });
};
