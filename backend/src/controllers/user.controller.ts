import { Request, Response } from "express";
import { ValidationError } from "sequelize";

import {
  CANT_CREATE_USER,
  EMAIL_ALREADY_EXISTS,
  SETTINGS_UPDATED,
  SOMETHING_WRONG,
  USERS_DELETED,
  USERS_UPDATED,
  USER_NOT_EXISTS,
  WRONG_PASSWORD
} from "../constants/httpMessages";
import {
  createUser,
  getAllUsers,
  loginUser,
  updateSettings,
  deleteUsers,
  updateUser
} from "../services/user.service";
import { HTTPCodes } from "../types/httpCodes";
import {
  IAuthUser,
  IUser,
  IUserCreation,
  IUserLogin,
  IUserSettings
} from "../types/user";

export const registrationController = async (
  req: Request<{}, {}, IUserCreation>,
  res: Response
) => {
  try {
    const data = req.body;

    const user = await createUser(data);

    res.json(user);
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(HTTPCodes.CONFLICT);
      if (e.errors[0].path === "email") {
        res.json({ msg: EMAIL_ALREADY_EXISTS });
      }
      return;
    }
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: CANT_CREATE_USER });
  }
};

export const getAllContoller = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();

    res.json(users);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};

export const loginController = async (
  req: Request<{}, {}, IUserLogin>,
  res: Response
) => {
  try {
    const { password, email } = req.body;

    const user = await loginUser(password, email);

    res.json(user);
  } catch (e) {
    if (e instanceof Error) {
      switch (e.message) {
        case `${HTTPCodes.NOT_FOUND}`:
          res.status(HTTPCodes.NOT_FOUND).json({ msg: USER_NOT_EXISTS });
          break;
        case `${HTTPCodes.BAD_REQUEST}`:
          res.status(HTTPCodes.BAD_REQUEST).json({ msg: WRONG_PASSWORD });
          break;
        default:
          res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
          break;
      }
    } else {
      res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
    }
  }
};

export const settingsController = async (
  req: Request<{}, {}, IUserSettings | (IUser & { field: string })[]>,
  res: Response
) => {
  try {
    const data = req.body;
    const user = req.user as IAuthUser;

    if (Array.isArray(data)) {
      await updateUser(data);

      res.json({ msg: USERS_UPDATED });
    } else {
      await updateSettings(
        { ...data, theme: user.theme === "dark" ? "light" : "dark" },
        user.email
      );

      res.json({ msg: SETTINGS_UPDATED });
    }
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};

export const deleteController = async (
  req: Request<{}, {}, string[]>,
  res: Response
) => {
  try {
    const data = req.body;

    await deleteUsers(data);

    res.json({ msg: USERS_DELETED });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};
