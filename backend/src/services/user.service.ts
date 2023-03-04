import bcrypt from "bcryptjs";
import { SALT_NUMBER } from "../constants/hash";
import User from "../models/user.model";
import { HTTPCodes } from "../types/httpCodes";

import { IUser, IUserCreation, IUserSettings } from "../types/user";
import { createToken } from "../utils/createToken";

export const createUser = async (user: IUserCreation) => {
  const { email, name, password, role: initRole } = user;

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
        password: passwordHash,
        role: initRole ? initRole : "user"
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
    token: createToken(userName, email, role, id, theme, language)
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
      token: createToken(
        user.name,
        user.email,
        user.role,
        user.id,
        user.theme,
        user.language
      ),
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

export const updateUser = async (data: (IUser & { field: string })[]) => {
  await Promise.all(
    data.map(user => {
      const { role, id, email, field } = user;

      const updateValues: Record<string, string> = {};

      switch (field) {
        case "role":
          updateValues.role = role === "admin" ? "user" : "admin";
          break;
        case "block":
          updateValues.status = "blocked";
          break;
        case "unblock":
          updateValues.status = "active";
          break;
      }

      return User.update(updateValues, { where: { id, email } });
    })
  );
};

export const deleteUsers = async (data: string[]) => {
  const promises = data.map(e => User.destroy({ where: { email: e } }));
  await Promise.all(promises);

  return true;
};
