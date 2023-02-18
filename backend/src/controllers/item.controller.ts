import { Request, Response } from "express";

import { SOMETHING_WRONG } from "../constants/httpMessages";
import { createItem, getCollectionItems } from "../services/item.service";
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
    console.log("e: ", e);
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};
