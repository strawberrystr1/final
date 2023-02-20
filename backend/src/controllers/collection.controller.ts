import { Request, Response } from "express";

import {
  COLLECTION_DELETED,
  COLLECTION_UPDATED,
  NO_COLLECTION_FOUND,
  NO_UPDATE_DATA,
  SOMETHING_WRONG,
  WRONG_URL_PARAMS
} from "../constants/httpMessages";
import {
  createCollection,
  deleteCollection,
  getCollections,
  getOneCollection,
  updateCollection
} from "../services/collection.service";
import { ICollectionCreate, ICollectionUpdate } from "../types/collection";
import { HTTPCodes } from "../types/httpCodes";
import { IAuthUser } from "../types/user";
import { mapResponseFields } from "../utils/mappers";

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
    const { id } = req.user as IAuthUser;

    if (id) {
      const collections = await getCollections(id);

      res.json(collections);
      return;
    }

    const collections = await getCollections();

    const response = mapResponseFields(collections);

    res.json(response);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};

export const handleGetOneCollection = async (req: Request, res: Response) => {
  try {
    const { collectionId } = req.params;
    const { id } = req.user as IAuthUser;

    if (typeof collectionId === "string") {
      const collection = await getOneCollection(id, +collectionId);

      if (collection) {
        const response = mapResponseFields([collection]);

        res.json(response[0]);
      } else {
        res.status(HTTPCodes.NOT_FOUND).json({ msg: NO_COLLECTION_FOUND });
      }
    } else {
      res.status(HTTPCodes.BAD_REQUEST).json({ msg: WRONG_URL_PARAMS });
    }
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};

export const handleDelete = async (
  req: Request<{ collectionId: number }>,
  res: Response
) => {
  try {
    const { collectionId } = req.params;

    if (!collectionId) {
      res.status(HTTPCodes.BAD_REQUEST).json({ msg: WRONG_URL_PARAMS });
      return;
    }

    await deleteCollection(collectionId);

    res.json({ msg: COLLECTION_DELETED });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};

export const handleUpdateCollection = async (
  req: Request<{ collectionId: number }, {}, ICollectionUpdate>,
  res: Response
) => {
  try {
    const { collectionId } = req.params;

    if (!collectionId) {
      res.status(HTTPCodes.BAD_REQUEST).json({ msg: WRONG_URL_PARAMS });
      return;
    }

    const data = req.body;

    if (!data) {
      res.status(HTTPCodes.BAD_REQUEST).json({ msg: NO_UPDATE_DATA });
      return;
    }

    await updateCollection(collectionId, data);

    res.json({ msg: COLLECTION_UPDATED });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};
