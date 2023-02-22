import { Request, Response } from "express";
import { LIKE_UPDATED, SOMETHING_WRONG } from "../constants/httpMessages";
import { updateLike } from "../services/like.service";
import { HTTPCodes } from "../types/httpCodes";
import { IUpdateLikePayload } from "../types/like";

export const handleUpdateLike = async (
  req: Request<{}, {}, IUpdateLikePayload>,
  res: Response
) => {
  try {
    const data = req.body;

    await updateLike(data);

    res.json({ msg: LIKE_UPDATED });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};
