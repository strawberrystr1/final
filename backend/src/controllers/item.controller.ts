import { Request, Response } from "express";

import {
  ITEM_DELETED,
  SOMETHING_WRONG,
  WRONG_URL_PARAMS
} from "../constants/httpMessages";
import {
  createItem,
  deleteItem,
  getCollectionItems,
  getOneItem
} from "../services/item.service";
import { HTTPCodes } from "../types/httpCodes";
import { ICreateCollectionItemPayload } from "../types/item";

export const handleCreateItem = async (
  req: Request<{ collectionId: number }, {}, ICreateCollectionItemPayload>,
  res: Response
) => {
  try {
    const data = req.body;
    const { collectionId } = req.params;
    const created = await createItem(data, collectionId);

    res.json(created);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};

export const handleGetAllCollectionItems = async (
  req: Request<{ collectionId: number }>,
  res: Response
) => {
  try {
    const { collectionId } = req.params;
    const items = await getCollectionItems(collectionId);

    res.json(items);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};

export const handleGetOneCollectionItem = async (
  req: Request<{ itemId: string }>,
  res: Response
) => {
  try {
    const { itemId } = req.params;

    if (!itemId) {
      res.status(HTTPCodes.BAD_REQUEST).json({ msg: WRONG_URL_PARAMS });
      return;
    }

    const item = await getOneItem(itemId);

    res.json(item);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};

export const handleDeleteItem = async (
  req: Request<{ itemId: string }>,
  res: Response
) => {
  try {
    const { itemId } = req.params;

    if (!itemId) {
      res.status(HTTPCodes.BAD_REQUEST).json({ msg: WRONG_URL_PARAMS });
      return;
    }

    await deleteItem(+itemId);

    res.json({ msg: ITEM_DELETED });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};
