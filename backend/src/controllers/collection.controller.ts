import { Request, Response } from "express";
import {
  createCollection,
  getCollections
} from "../services/collection.service";
import { ICollectionCreate } from "../types/collection";
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
  } catch (e) {}
};

export const handleGetCollections = async (req: Request, res: Response) => {
  try {
    const collections = await getCollections();

    res.json(collections);
  } catch (e) {
    console.log(e)
  }
};
