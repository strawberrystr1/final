import { sendItemUpdatesToAll } from "../controllers/item.controller";
import Comment from "../models/comment.model";
import { ICommentCreation } from "../types/comment";

export const getItemComments = async (id: string) => {
  return await Comment.findAll({
    where: { itemId: id },
    order: [["id", "ASC"]]
  });
};

export const createComment = async (data: ICommentCreation) => {
  const comment = await Comment.create(data, { returning: true });
  sendItemUpdatesToAll(comment.toJSON());
  return comment;
};
