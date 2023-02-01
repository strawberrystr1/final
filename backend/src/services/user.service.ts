import bcrypt from "bcrypt";
import { SALT_NUMBER } from "../constants/hash";
import User from "../models/user.model";

import { IUserCreation } from "../types/user";
import { createToken } from "../utils/createToken";

export const createUser = async (user: IUserCreation) => {
  const { email, name, password } = user;

  const passwordHash = bcrypt.hashSync(password, SALT_NUMBER);

  const {
    role,
    language,
    theme,
    id,
    name: userName
  } = (
    await User.create(
      {
        name,
        email,
        password: passwordHash
      },
      { returning: true }
    )
  ).toJSON();

  return {
    role,
    language,
    theme,
    id,
    name: userName,
    token: createToken(userName, email, role)
  };
};

export const getUser = async (name: string, email: string) => {
  const user = (await User.findOne({ where: { name, email } }))?.toJSON();

  return user;
};

export const getAllUsers = async () => {
  return await User.findAll();
};

export const loginUser = async (password: string, email: string) => {
  
}