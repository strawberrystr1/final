import { Request, Response } from "express";
import { ValidationError } from "sequelize";

import {
  CANT_CREATE_USER,
  EMAIL_ALREADY_EXISTS
} from "../constants/httpMessages";
import { createUser, getAllUsers } from "../services/user.service";
import { HTTPCodes } from "../types/httpCodes";

export const registrationController = async (req: Request, res: Response) => {
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
