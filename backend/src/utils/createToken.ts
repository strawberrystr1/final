import jwt from "jsonwebtoken";

export const createToken = (name: string, email: string, role: string) => {
  return jwt.sign({ name, email, role }, process.env.JWT_SECRET as string, {
    expiresIn: "10s"
  });
};
