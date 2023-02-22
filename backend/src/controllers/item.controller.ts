import { Request, Response } from "express";

import {
  ITEM_DELETED,
  ITEM_UPDATED,
  SOMETHING_WRONG,
  WRONG_URL_PARAMS
} from "../constants/httpMessages";
import {
  createItem,
  deleteItem,
  getCollectionItems,
  getOneItem,
  updateCollectionItem
} from "../services/item.service";
import { getItemLikes } from "../services/like.service";
import { ICommentModel } from "../types/comment";
import { HTTPCodes } from "../types/httpCodes";
import { ICreateCollectionItemPayload } from "../types/item";
import { ILikeWithUsers } from "../types/like";

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

export const handleUpdateItem = async (
  req: Request<{ itemId: string }, {}, ICreateCollectionItemPayload>,
  res: Response
) => {
  try {
    const { itemId } = req.params;

    if (!itemId) {
      res.status(HTTPCodes.BAD_REQUEST).json({ msg: WRONG_URL_PARAMS });
      return;
    }

    const data = req.body;
    await updateCollectionItem(itemId, data);

    res.json({ msg: ITEM_UPDATED });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};

export const handleGetItemLikes = async (
  req: Request<{ itemId: string }>,
  res: Response
) => {
  try {
    const { itemId } = req.params;
    if (!itemId) {
      res.status(HTTPCodes.BAD_REQUEST).json({ msg: WRONG_URL_PARAMS });
      return;
    }

    const likes = await getItemLikes(itemId);
    res.json(likes);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};

let clients: { id: number; res: Response }[] = [];

export const sendItemUpdatesToAll = <T>(data: T) => {
  clients.forEach(client =>
    client.res.write(`data: ${JSON.stringify(data)}\n\n`, "utf-8")
  );
};

export const handleSSE = async (req: Request, res: Response) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*"
  });
  res.write("retry: 10000\n", "utf-8");
  res.flushHeaders();

  const clientId = Date.now();

  clients.push({
    id: clientId,
    res
  });

  req.on("close", () => {
    clients = clients.filter(client => client.id !== clientId);
  });
};
