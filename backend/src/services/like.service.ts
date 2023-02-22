import Like from "../models/like.model";
import User from "../models/user.model";
import { IUpdateLikePayload } from "../types/like";

export const getItemLikes = async (id: string) => {
  return await Like.findOne({ where: { itemId: id }, include: [User] });
};

export const updateLike = async (data: IUpdateLikePayload) => {
  console.log(data);
};
