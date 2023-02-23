import { Request, Response } from "express";

import { NO_DATA, SOMETHING_WRONG } from "../constants/httpMessages";
import { createComment, getItemComments } from "../services/comment.servicer";
import { ICommentCreation } from "../types/comment";
import { HTTPCodes } from "../types/httpCodes";

export const handleGetItemComments = async (
  req: Request<{ itemId: string }>,
  res: Response
) => {
  try {
    const { itemId } = req.params;

    const comments = await getItemComments(itemId);

    res.json(comments);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};

export const handleCreateComment = async (
  req: Request<{}, {}, ICommentCreation>,
  res: Response
) => {
  try {
    const data = req.body;
    if (!data) {
      res.status(HTTPCodes.BAD_REQUEST).json({ msg: NO_DATA });
    }

    const comment = await createComment(data);

    res.json(comment);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_ERROR).json({ msg: SOMETHING_WRONG });
  }
};
