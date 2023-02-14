import { Request, Response } from "express";
import { SOMETHING_WRONG } from "../constants/httpMessages";
import {
  createCollection,
  getCollections
} from "../services/collection.service";
import { ICollectionCreate } from "../types/collection";
import { HTTPCodes } from "../types/httpCodes";
import { IAuthUser } from "../types/user";

export const handleCreateCollection = async (
  req: Request<{}, {}, ICollectionCreate>,
  res: Response
) => {
  try {
    const data = req.body;
    const user = req.user as IAuthUser;

    const collection = await createCollection(data, user);

    res.json(collection);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};

export const handleGetCollections = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (userId) {
      const collections = await getCollections(+userId);

      res.json(collections);
      return;
    }

    const collections = await getCollections();

    res.json(collections);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};
