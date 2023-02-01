import { Request, Response } from "express";
import { ValidationError } from "sequelize";

import {
  CANT_CREATE_USER,
  EMAIL_ALREADY_EXISTS,
  SOMETHING_WRONG,
  USER_NOT_EXISTS,
  WRONG_PASSWORD
} from "../constants/httpMessages";
import { createUser, getAllUsers, loginUser } from "../services/user.service";
import { HTTPCodes } from "../types/httpCodes";
import { IUserCreation, IUserLogin } from "../types/user";

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
  } catch (e) {}
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
    console.log('e: ', e);
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
    }
  }
};
