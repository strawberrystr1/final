import bcrypt from "bcrypt";
import { SALT_NUMBER } from "../constants/hash";
import User from "../models/user.model";
import { HTTPCodes } from "../types/httpCodes";

import { IUserCreation, IUserSettings } from "../types/user";
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
    email,
    theme,
    id,
    name: userName,
    token: createToken(userName, email, role)
  };
};

export const getUser = async (email: string) => {
  const user = (await User.findOne({ where: { email } }))?.toJSON();

  return user;
};

export const getAllUsers = async () => {
  return await User.findAll();
};

export const loginUser = async (password: string, email: string) => {
  const user = await getUser(email);

  if (!user) {
    throw new Error(`${HTTPCodes.NOT_FOUND}`);
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    return {
      name: user.name,
      role: user.role,
      id: user.id,
      language: user.language,
      token: createToken(user.name, user.email, user.role),
      email: user.email,
      theme: user.theme
    };
  } else {
    throw new Error(`${HTTPCodes.BAD_REQUEST}`);
  }
};

export const updateSettings = async (data: IUserSettings, email: string) => {
  await User.update(data, { where: { email } });
};
